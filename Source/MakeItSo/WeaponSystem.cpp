#ifndef WEB_SERVER_TEST
#include "WeaponSystem.h"
#else
#include "stdafx.h"
#include "WeaponSystem.h"

#include <algorithm>    // std::shuffle
#include <random>       // std::default_random_engine
#include <chrono>       // std::chrono::system_clock
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"
#include "MakeItSoPawn.h"
#include "SensorSystem.h"

#define MAX_SOLUTION_DIFFICULTY 10

UWeaponSystem::UWeaponSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 0.2f;
	PrimaryComponentTick.SetTickFunctionEnable(true);
}

void UWeaponSystem::ResetData()
{
	selectedTargetID = 0;
	currentlyFacing = FWeaponTargetingSolution::ETargetingFace::NoFace;
	CLEAR(targetingSolutions);
}

void UWeaponSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	auto targetInfo = GetSelectedTarget();
	auto target = targetInfo == nullptr ? nullptr : WEAK_PTR_GET(targetInfo->actor);

	if (target == nullptr)
	{
		selectedTargetID = 0;
		if (ISCLIENT())
			SendSelectedTarget();
		return;
	}

	bool solutionsChanged = false;

	// Add any new targeting solutions
	for (auto identifier : targetInfo->targetingSolutions)
	{
		if (MAPCONTAINS(targetingSolutions, identifier))
			continue;

		AddTargetingSolution(identifier);
		solutionsChanged = true;
	}

	// Remove any removed ones
#ifdef WEB_SERVER_TEST
	for (auto it = targetingSolutions.cbegin(); it != targetingSolutions.cend(); )
	{
		auto identifier = it->first;
#else
	for (auto it = targetingSolutions.CreateIterator(); it;)
	{
		auto identifier = PAIRKEY(it);
#endif

		if (SETCONTAINS(targetInfo->targetingSolutions, identifier))
			++it;
		else
		{
#ifdef WEB_SERVER_TEST
			it = targetingSolutions.erase(it);
#else
			it.RemoveCurrent();
#endif
			solutionsChanged = true;
		}
	}

	// update the angle of the target we are currently facing
	auto towardsTarget = (target->GetActorLocation() - crewManager->GetShipPawn()->GetActorLocation());
	towardsTarget.Normalize(1);

	auto facingTarget = towardsTarget.ToOrientationQuat();
	// TODO: should this be the other way around?
	targetOrientation = (facingTarget - target->GetActorQuat())
		.Rotator();

	auto prevFacing = currentlyFacing;
	// TODO: ensure these aren't all the wrong way round
	if (targetOrientation.Pitch > 45.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Bottom;
	else if (targetOrientation.Pitch < -45.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Top;
	else if (targetOrientation.Yaw < -135.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Front;
	else if (targetOrientation.Yaw < -45.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Left;
	else if (targetOrientation.Yaw < 45.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Rear;
	else if (targetOrientation.Yaw < 135.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Right;
	else
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Front;

	if (ISCLIENT())
	{
		if (prevFacing != currentlyFacing)
			SendFacing();

		SendOrientation();

		if (solutionsChanged)
			SendTargetingSolutions();
	}
}

bool UWeaponSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "wpn_target "))
	{
		uint8 targetID = ExtractInt(msg, sizeof("wpn_target "));
		SelectTarget(targetID);
	}
	else if (STARTS_WITH(msg, "wpn_fire "))
	{
		TArray<FString> parts = SplitParts(msg, sizeof("wpn_fire "));

		if (SIZENUM(parts) >= 5)
		{
			auto identifier = (ETargetingSolutionIdentifier)STOI(parts[0]);
			uint8 x1 = STOI(parts[1]);
			uint8 y1 = STOI(parts[2]);
			uint8 x2 = STOI(parts[3]);
			uint8 y2 = STOI(parts[4]);

			FireSolution(identifier, x1, y1, x2, y2);
		}
	}
	else
		return false;

	return true;
}

void UWeaponSystem::SendAllData_Implementation()
{
	SendSelectedTarget();
	if (selectedTargetID != 0)
		SendTargetingSolutions();

	SendFacing();
	SendOrientation();
}


void UWeaponSystem::SendSelectedTarget_Implementation()
{
	FString output = TEXT("wpn_target ");

	APPENDINT(output, selectedTargetID);

	SendSystem(output);
}

void UWeaponSystem::SendTargetingSolutions_Implementation()
{
	FString output = TEXT("wpn_solutions");

	bool first = true;

	for (auto& solution : targetingSolutions)
	{
		if (first)
		{
			first = false;
			output += TEXT(" ");
		}
		else
		{
			output += TEXT("/");
		}

		// read by parseSolution
		auto details = PAIRVALUE(solution);

		APPENDINT(output, (uint8)PAIRKEY(solution));
		output += TEXT(" ");
		APPENDINT(output, details.baseDifficulty);
		output += TEXT(" ");
		APPENDINT(output, (int8)details.bestFacing);

		for (auto polygon : details.polygons)
		{
			output += TEXT("|");

			bool firstCoord = true;

			// read by parsePolygon
			for (uint8 coord : polygon) {
				if (firstCoord)
					firstCoord = false;
				else
					output += TEXT(" ");

				APPENDINT(output, coord);
			}
		}
	}

	SendSystem(output);
}

void UWeaponSystem::SendFacing_Implementation()
{
	FString output = TEXT("wpn_facing ");

	APPENDINT(output, (int8)currentlyFacing);

	SendSystem(output);
}

void UWeaponSystem::SendOrientation_Implementation()
{
	FString output = TEXT("wpn_orientation ");

	APPENDINT(output, targetOrientation.Pitch);
	output += TEXT(" ");
	APPENDINT(output, targetOrientation.Yaw);
	output += TEXT(" ");
	APPENDINT(output, targetOrientation.Roll);

	SendSystem(output);
}

void UWeaponSystem::SendFire_Implementation(ETargetingSolutionIdentifier solution)
{
	FString output = TEXT("wpn_fire ");
	APPENDINT(output, (uint8)solution);
	SendSystem(output);
}

void UWeaponSystem::SelectTarget_Implementation(uint16 targetID)
{
	selectedTargetID = targetID;
	DetermineTargetingSolutions();

	if (ISCLIENT())
	{
		SendSelectedTarget();
		SendTargetingSolutions();
	}
}

void UWeaponSystem::FireSolution_Implementation(ETargetingSolutionIdentifier identifier, uint8 x1, uint8 y1, uint8 x2, uint8 y2)
{
	if (selectedTargetID == 0 || !MAPCONTAINS(targetingSolutions, identifier))
		return;

	auto solution = targetingSolutions[identifier];
	auto polygon = GetPolygonForCurrentlyFacing(solution);

	if (SIZENUM(polygon) == 0)
		return; // no polygon for current face, ignore

	float percentageAwayFromPerfectAim = BisectPolygon(polygon, x1, y1, x2, y2);

	auto targetSystem = GetSystemForSolution(identifier);
	auto damageToDeal = GetDamageForSolution(identifier, percentageAwayFromPerfectAim);

	if (identifier >= ETargetingSolutionIdentifier::MIN_VULNERABILITY)
	{
		// Vulnerabilities are consumed when they are used
		RemoveTargetingSolution(identifier);
	}
	else
	{
		// Regular solutions just need new shapes to be calculated
		CreatePolygons(solution);
	}


	if (ISCLIENT())
		SendTargetingSolutions(); // TODO: replace this with specific calls to add/remove ... yeah? is that worth having if it can't affect non-local clients?


	auto targetInfo = GetSelectedTarget();
	if (targetInfo == nullptr)
		return;

	auto target = WEAK_PTR_GET(targetInfo->actor);
	if (target == nullptr)
		return;

	// TODO: actually fire ... deal damage to targetSystem of target ... probably need a "targetable thing" base class between AActor and AMakeItSoShipPawn

}

void UWeaponSystem::RemoveTargetingSolution(ETargetingSolutionIdentifier identifier)
{
	MAPREMOVE(targetingSolutions, identifier);

	auto targetInfo = GetSelectedTarget();

	if (targetInfo == nullptr)
		return;

	SETREMOVEVAL(targetInfo->targetingSolutions, identifier);
}

USensorTargetInfo *UWeaponSystem::GetSelectedTarget()
{
	if (selectedTargetID == 0)
		return nullptr;

	auto sensorSystem = crewManager->GetSystem(UShipSystem::ESystem::Sensors);
	if (sensorSystem == nullptr)
		return nullptr;

	return ((USensorSystem*)sensorSystem)->GetTarget(selectedTargetID);
}

void UWeaponSystem::DetermineTargetingSolutions()
{
	CLEAR(targetingSolutions);

	auto targetInfo = GetSelectedTarget();

	if (targetInfo != nullptr)
		for (auto identifier : targetInfo->targetingSolutions)
			AddTargetingSolution(identifier);
}

void UWeaponSystem::AddTargetingSolution(ETargetingSolutionIdentifier identifier)
{
	FWeaponTargetingSolution solution;
	solution.baseDifficulty = GetSolutionDifficulty(identifier);
	solution.bestFacing = GetSolutionBestFace(identifier);
	CreatePolygons(solution);

	MAPADD(targetingSolutions, identifier, solution, ETargetingSolutionIdentifier, FWeaponTargetingSolution);
}

void UWeaponSystem::CreatePolygons(FWeaponTargetingSolution &solution)
{
	CLEAR(solution.polygons);

	// always have one polygon that uses the solution's base difficulty
	CreatePolygon(solution, solution.baseDifficulty);

	if (solution.bestFacing == FWeaponTargetingSolution::ETargetingFace::NoFace)
		return;


	uint8 sideDifficulty = solution.baseDifficulty + 2;
	if (sideDifficulty > MAX_SOLUTION_DIFFICULTY)
		return;

	CreatePolygon(solution, sideDifficulty);


	uint8 oppositeDifficulty = sideDifficulty + 4;
	if (oppositeDifficulty > MAX_SOLUTION_DIFFICULTY)
		return;

	CreatePolygon(solution, oppositeDifficulty);
}

void UWeaponSystem::CreatePolygon(FWeaponTargetingSolution &solution, uint8 difficulty)
{
	TArray<uint8> polygon;

	switch (difficulty)
	{
	case 2:
		CreatePolygonDifficulty2(polygon);
		break;
	case 3:
		CreatePolygonDifficulty3(polygon);
		break;
	case 4:
		CreatePolygonDifficulty4(polygon);
		break;
	case 5:
		CreatePolygonDifficulty5(polygon);
		break;
	case 6:
		CreatePolygonDifficulty6(polygon);
		break;
	case 7:
		CreatePolygonDifficulty7(polygon);
		break;
	case 8:
		CreatePolygonDifficulty8(polygon);
		break;
	case 9:
		CreatePolygonDifficulty9(polygon);
		break;
	case 10:
		CreatePolygonDifficulty10(polygon);
		break;
	default:
		CreatePolygonDifficulty1(polygon);
		break;
	}

	SETADD(solution.polygons, polygon);
}

#define MIN_POLY_X 5
#define MIN_POLY_Y 5

void UWeaponSystem::CreatePolygonDifficulty1(TArray<uint8> &polygon)
{
	// An orthogonal rectangle

	uint8 x1 = MIN_POLY_X;
	uint8 y1 = MIN_POLY_Y;

	uint8 x2 = FMath::RandRange(x1 + 3, x1 + 8);
	uint8 y2 = FMath::RandRange(y1 + 3, y1 + 8);

	SETADD(polygon, x1);
	SETADD(polygon, y1);

	SETADD(polygon, x2);
	SETADD(polygon, y1);

	SETADD(polygon, x2);
	SETADD(polygon, y2);

	SETADD(polygon, x1);
	SETADD(polygon, y2);
}

void UWeaponSystem::CreatePolygonDifficulty2(TArray<uint8> &polygon)
{
	// A parallelogram, skewed on either axis in either direction

	uint8 x1 = MIN_POLY_X;
	uint8 y1 = MIN_POLY_Y;

	uint8 x2 = FMath::RandRange(x1 + 3, x1 + 6);
	uint8 y2 = FMath::RandRange(y1 + 3, y1 + 5);

	uint8 skew = FMath::RandRange(1, 4);

	uint8 topX1 = x1, topX2 = x2, bottomX1 = x1, bottomX2 = x2;
	uint8 leftY1 = y1, leftY2 = y2, rightY1 = y1, rightY2 = y2;

	switch (FMath::RandRange(0, 3))
	{
	case 0:
		topX1 += skew;
		topX2 += skew;
		break;
	case 1:
		bottomX1 += skew;
		bottomX2 += skew;
		break;
	case 2:
		leftY1 += skew;
		leftY2 += skew;
		break;
	case 3:
		rightY1 += skew;
		rightY2 += skew;
		break;
	}

	SETADD(polygon, topX1);
	SETADD(polygon, leftY1);

	SETADD(polygon, topX2);
	SETADD(polygon, rightY1);

	SETADD(polygon, bottomX2);
	SETADD(polygon, rightY2);

	SETADD(polygon, bottomX1);
	SETADD(polygon, leftY2);
}

void UWeaponSystem::CreatePolygonDifficulty3(TArray<uint8> &polygon)
{
	// A non-symmetrical trapezeum

	uint8 xmin = MIN_POLY_X;
	uint8 ymin = MIN_POLY_Y;

	uint8 xmax = FMath::RandRange(xmin + 5, xmin + 8);
	uint8 ymax = FMath::RandRange(ymin + 5, ymin + 8);

	uint8 x1 = xmin, y1 = ymin;
	uint8 x2 = xmax, y2 = ymin;
	uint8 x3 = xmax, y3 = ymax;
	uint8 x4 = xmin, y4 = ymax;
	uint8 skew1, skew2;

	// Pick one face to shrink
	switch (FMath::RandRange(0, 3))
	{
	case 0: // top
		skew1 = FMath::RandRange(1, (xmax - xmin - 1) / 2);
		skew2 = FMath::RandRange(1, (xmax - xmin - 1) / 2);
		if (skew1 == skew2)
			skew2--;

		x1 += skew1;
		x2 -= skew2;
		break;
	case 1: // bottom
		skew1 = FMath::RandRange(1, (xmax - xmin - 1) / 2);
		skew2 = FMath::RandRange(1, (xmax - xmin - 1) / 2);
		if (skew1 == skew2)
			skew2--;

		x4 += skew1;
		x3 -= skew2;
		break;
	case 2: // left
		skew1 = FMath::RandRange(1, (ymax - ymin - 1) / 2);
		skew2 = FMath::RandRange(1, (ymax - ymin - 1) / 2);
		if (skew1 == skew2)
			skew2--;

		y2 += skew1;
		y3 -= skew2;
		break;
	case 3: // right
		skew1 = FMath::RandRange(1, (ymax - ymin - 1) / 2);
		skew2 = FMath::RandRange(1, (ymax - ymin - 1) / 2);
		if (skew1 == skew2)
			skew2--;

		y1 += skew1;
		y4 -= skew2;
		break;
	}

	SETADD(polygon, x1);
	SETADD(polygon, y1);

	SETADD(polygon, x2);
	SETADD(polygon, y2);

	SETADD(polygon, x3);
	SETADD(polygon, y3);

	SETADD(polygon, x4);
	SETADD(polygon, y4);
}

void UWeaponSystem::CreatePolygonDifficulty4(TArray<uint8> &polygon)
{
	// An orthogonal rectangle with two vertices offset differently

	uint8 xmin = MIN_POLY_X + 2;
	uint8 ymin = MIN_POLY_Y + 2;

	uint8 xmax = FMath::RandRange(xmin + 4, xmin + 8);
	uint8 ymax = FMath::RandRange(ymin + 4, ymin + 8);

	uint8 x1 = xmin, y1 = ymin;
	uint8 x2 = xmax, y2 = ymin;
	uint8 x3 = xmax, y3 = ymax;
	uint8 x4 = xmin, y4 = ymax;

	// TODO: this

	SETADD(polygon, x1);
	SETADD(polygon, y1);

	SETADD(polygon, x2);
	SETADD(polygon, y1);

	SETADD(polygon, x2);
	SETADD(polygon, y2);

	SETADD(polygon, x1);
	SETADD(polygon, y2);
}

void UWeaponSystem::CreatePolygonDifficulty5(TArray<uint8> &polygon)
{
	// An orthogonal rectangle with four vertices offset
#define OFFSET_MAX 3

	uint8 xmin = MIN_POLY_X + OFFSET_MAX;
	uint8 ymin = MIN_POLY_Y + OFFSET_MAX;

	uint8 xmax = FMath::RandRange(xmin + 4, xmin + 8);
	uint8 ymax = FMath::RandRange(ymin + 4, ymin + 8);

	uint8 x1 = xmin, y1 = ymin;
	uint8 x2 = xmax, y2 = ymin;
	uint8 x3 = xmax, y3 = ymax;
	uint8 x4 = xmin, y4 = ymax;


	// Pick two corners to offset
	uint8 offsetCorner1 = FMath::RandRange(0, 3);
	uint8 offsetCorner2;
	do {
		offsetCorner2 = FMath::RandRange(0, 3);
	} while (offsetCorner2 != offsetCorner1);


	uint8 &offsetX = x1;
	uint8 &offsetY = y1;


	// Apply offset to first corner
	switch (offsetCorner1)
	{
	case 0:
		offsetX = x1;
		offsetY = y1;
		break;
	case 1:
		offsetX = x2;
		offsetY = y2;
		break;
	case 2:
		offsetX = x3;
		offsetY = y3;
		break;
	case 3:
		offsetX = x4;
		offsetY = y4;
		break;
	}

	int8 dx, dy;
	do {
		dx = FMath::RandRange(-OFFSET_MAX, OFFSET_MAX);
		dy = FMath::RandRange(-OFFSET_MAX, OFFSET_MAX);
	} while (dx != 0 || dy != 0);

	offsetX += dx;
	offsetY += dy;


	// Apply offset to second corner
	switch (offsetCorner2)
	{
	case 0:
		offsetX = x1;
		offsetY = y1;
		break;
	case 1:
		offsetX = x2;
		offsetY = y2;
		break;
	case 2:
		offsetX = x3;
		offsetY = y3;
		break;
	case 3:
		offsetX = x4;
		offsetY = y4;
		break;
	}

	do {
		dx = FMath::RandRange(-OFFSET_MAX, OFFSET_MAX);
		dy = FMath::RandRange(-OFFSET_MAX, OFFSET_MAX);
	} while (dx != 0 || dy != 0);

	offsetX += dx;
	offsetY += dy;


	SETADD(polygon, x1);
	SETADD(polygon, y1);

	SETADD(polygon, x2);
	SETADD(polygon, y1);

	SETADD(polygon, x2);
	SETADD(polygon, y2);

	SETADD(polygon, x1);
	SETADD(polygon, y2);
}

void UWeaponSystem::CreatePolygonDifficulty6(TArray<uint8> &polygon)
{
	// An orthogonal rectangle with four vertices offset
#define OFFSET_MAX 3

	uint8 xmin = MIN_POLY_X + OFFSET_MAX;
	uint8 ymin = MIN_POLY_Y + OFFSET_MAX;

	uint8 xmax = FMath::RandRange(xmin + 4, xmin + 8);
	uint8 ymax = FMath::RandRange(ymin + 4, ymin + 8);

	uint8 x1 = xmin, y1 = ymin;
	uint8 x2 = xmax, y2 = ymin;
	uint8 x3 = xmax, y3 = ymax;
	uint8 x4 = xmin, y4 = ymax;


	// Pick two corners to offset
	uint8 offsetCorner1, offsetCorner2, offsetCorner3;
	
	switch (FMath::RandRange(0, 3))
	{
	case 0:
		offsetCorner1 = 0;
		offsetCorner2 = 1;
		offsetCorner3 = 2;
		break;
	case 1:
		offsetCorner1 = 1;
		offsetCorner2 = 2;
		offsetCorner3 = 3;
		break;
	case 2:
		offsetCorner1 = 2;
		offsetCorner2 = 3;
		offsetCorner3 = 0;
		break;
	case 3:
		offsetCorner1 = 3;
		offsetCorner2 = 0;
		offsetCorner3 = 1;
		break;
	}

	uint8 &offsetX = x1;
	uint8 &offsetY = y1;


	// Apply offset to first corner
	switch (offsetCorner1)
	{
	case 0:
		offsetX = x1;
		offsetY = y1;
		break;
	case 1:
		offsetX = x2;
		offsetY = y2;
		break;
	case 2:
		offsetX = x3;
		offsetY = y3;
		break;
	case 3:
		offsetX = x4;
		offsetY = y4;
		break;
	}

	int8 dx, dy;
	do {
		dx = FMath::RandRange(-OFFSET_MAX, OFFSET_MAX);
		dy = FMath::RandRange(-OFFSET_MAX, OFFSET_MAX);
	} while (dx != 0 || dy != 0);

	offsetX += dx;
	offsetY += dy;


	// Apply offset to second corner
	switch (offsetCorner2)
	{
	case 0:
		offsetX = x1;
		offsetY = y1;
		break;
	case 1:
		offsetX = x2;
		offsetY = y2;
		break;
	case 2:
		offsetX = x3;
		offsetY = y3;
		break;
	case 3:
		offsetX = x4;
		offsetY = y4;
		break;
	}

	do {
		dx = FMath::RandRange(-OFFSET_MAX, OFFSET_MAX);
		dy = FMath::RandRange(-OFFSET_MAX, OFFSET_MAX);
	} while (dx != 0 || dy != 0);

	offsetX += dx;
	offsetY += dy;


	// Apply offset to third corner
	switch (offsetCorner3)
	{
	case 0:
		offsetX = x1;
		offsetY = y1;
		break;
	case 1:
		offsetX = x2;
		offsetY = y2;
		break;
	case 2:
		offsetX = x3;
		offsetY = y3;
		break;
	case 3:
		offsetX = x4;
		offsetY = y4;
		break;
	}

	do {
		dx = FMath::RandRange(-OFFSET_MAX, OFFSET_MAX);
		dy = FMath::RandRange(-OFFSET_MAX, OFFSET_MAX);
	} while (dx != 0 || dy != 0);

	offsetX += dx;
	offsetY += dy;



	SETADD(polygon, x1);
	SETADD(polygon, y1);

	SETADD(polygon, x2);
	SETADD(polygon, y1);

	SETADD(polygon, x2);
	SETADD(polygon, y2);

	SETADD(polygon, x1);
	SETADD(polygon, y2);
}

void UWeaponSystem::CreatePolygonDifficulty7(TArray<uint8> &polygon)
{
	// A pentagon with all its vertices offset

	// TODO: this
	CreatePolygonDifficulty1(polygon);
}

void UWeaponSystem::CreatePolygonDifficulty8(TArray<uint8> &polygon)
{
	// A hexagon with all its vertices offset

	// TODO: this
	CreatePolygonDifficulty1(polygon);
}

void UWeaponSystem::CreatePolygonDifficulty9(TArray<uint8> &polygon)
{
	// A heptagon with all its vertices offset

	// TODO: this
	CreatePolygonDifficulty1(polygon);
}

void UWeaponSystem::CreatePolygonDifficulty10(TArray<uint8> &polygon)
{
	// An octagon with all its vertices offset

	// TODO: this
	CreatePolygonDifficulty1(polygon);
}

TArray<uint8> emptyPoly;

TArray<uint8> UWeaponSystem::GetPolygonForCurrentlyFacing(FWeaponTargetingSolution &solution)
{
	auto numPolygons = SIZENUM(solution.polygons);

	if (numPolygons < 2 || solution.bestFacing == FWeaponTargetingSolution::ETargetingFace::NoFace || currentlyFacing == solution.bestFacing)
		return solution.polygons[0];

	if (currentlyFacing == -solution.bestFacing)
	{
		if (numPolygons > 2)
			return solution.polygons[2];
		else
			return emptyPoly;
	}

	return solution.polygons[1];
}

float UWeaponSystem::BisectPolygon(TArray<uint8> points, uint8 x1, uint8 y1, uint8 x2, uint8 y2)
{
	auto length = SIZENUM(points);

	if (length < 6)
		return 0;

	TArray<float> pointsAbove;
	TArray<float> pointsBelow;

	float gradientBisector;
	float yInterceptBisector;
	GetLineEquation((float)x1, (float)y1, (float)x2, (float)y2, gradientBisector, yInterceptBisector);

	float prevX = (float)points[0];
	float prevY = (float)points[1];
	bool prevIsAbove = IsAboveBisector(prevX, prevY, gradientBisector, yInterceptBisector, x1, x2);

	if (prevIsAbove)
	{
		SETADD(pointsAbove, prevX);
		SETADD(pointsAbove, prevY);
	}
	else
	{
		SETADD(pointsBelow, prevX);
		SETADD(pointsBelow, prevY);
	}

	for (auto i = 3; i < length; i += 2)
	{
		float currentX = (float)points[i - 1];
		float currentY = (float)points[i];

		bool currentIsAbove = IsAboveBisector(currentX, currentY, gradientBisector, yInterceptBisector, x1, x2);

		// if this segment crossed the bisection line, add the point that happens at to both sets and continue (adding to the other set now)
		if (currentIsAbove != prevIsAbove)
		{
			float gradientSegment;
			float yInterceptSegment;
			GetLineEquation(prevX, prevY, currentX, currentY, gradientSegment, yInterceptSegment);

			float intersectX;
			float intersectY;
			GetLineIntersection(gradientBisector, yInterceptBisector, gradientSegment, yInterceptSegment, intersectX, intersectY);

			SETADD(pointsAbove, intersectX);
			SETADD(pointsAbove, intersectY);
			SETADD(pointsBelow, intersectX);
			SETADD(pointsBelow, intersectY);
        }

		if (currentIsAbove)
		{
			SETADD(pointsAbove, currentX);
			SETADD(pointsAbove, currentY);
		}
		else
		{
			SETADD(pointsBelow, currentX);
			SETADD(pointsBelow, currentY);
		}

		prevX = currentX;
		prevY = currentY;
        prevIsAbove = currentIsAbove;
	}

	float areaAbove = GetArea(pointsAbove);
	float areaBelow = GetArea(pointsBelow);

	float abovePercentage = 100.f * areaAbove / (areaAbove + areaBelow);
	float belowPercentage = 100.f * areaBelow / (areaAbove + areaBelow);

	return 50.f - FMath::Min(abovePercentage, belowPercentage);
}

bool UWeaponSystem::IsAboveBisector(float testX, float testY, float gradient, float yIntercept, uint8 x1, uint8 x2)
{
	return x2 == x1
		? (testX < x1)
		: (gradient * testX + yIntercept > testY);
}

#define POSITIVE_INFINITY 99999999999999999999999999999999999999.f
void UWeaponSystem::GetLineEquation(float x1, float y1, float x2, float y2, float &gradient, float &yIntercept)
{
	if (x2 == x1)
	{
		gradient = POSITIVE_INFINITY;
		yIntercept = x1; // this is a bit of a hack but it's only used in the next function so that's ok-ish
	}
	else
	{
		gradient = (y2 - y1) / (x2 - x1);
		// y = mx + c
		// c = y - mx
		yIntercept = y2 - gradient * x2;
	}
}

void UWeaponSystem::GetLineIntersection(float gradient1, float yIntercept1, float gradient2, float yIntercept2, float &x, float &y)
{
	if (gradient1 == gradient2)
	{
		if (gradient1 == POSITIVE_INFINITY)
		{
			x = yIntercept1;
			y = 0;
		}
		else
		{
			x = 0;
			y = yIntercept1; // i.e.   m1 x + c1
		}
	}
	else if (gradient1 == POSITIVE_INFINITY)
	{
		x = yIntercept1;
		y = gradient2 * x + yIntercept2;
	}
	else if (gradient2 == POSITIVE_INFINITY)
	{
		x = yIntercept2;
		y = gradient1 * x + yIntercept1;
	}
	else
	{
		// y = m1 x + c1
		// y = m2 x + c2

		// m1 x + c1 = m2 x + c2
		// m1 x - m2 x + c1 = c2
		// m1 x - m2 x = c2 - c1
		// m1 - m2 = (c2 - c1) / x

		x = (yIntercept2 - yIntercept1) / (gradient1 - gradient2);
		y = gradient1 * x + yIntercept1;
	}
}

float UWeaponSystem::GetArea(TArray<float> points)
{
	auto length = SIZENUM(points);

	if (length < 6) {
		return 0;
	}

	float firstTot = 0.f;
	float secondTot = 0.f;

	float prevX = points[0];
	float prevY = points[1];

	for (auto i = 3; i < length; i += 2)
	{
		float currentX = points[i - 1];
		float currentY = points[i];

		firstTot += prevX * currentY;
		secondTot += prevY * currentX;

		prevX = currentX;
		prevY = currentY;
	}

	return (firstTot - secondTot) / 2.f;
}

FWeaponTargetingSolution::ETargetingFace UWeaponSystem::GetSolutionBestFace(ETargetingSolutionIdentifier solution)
{
	switch (solution)
	{
	case ETargetingSolutionIdentifier::Engines:
	case ETargetingSolutionIdentifier::EngineVulnerability:
		return FWeaponTargetingSolution::Rear;
	case ETargetingSolutionIdentifier::Warp:
	case ETargetingSolutionIdentifier::WarpVulnerability:
		return FWeaponTargetingSolution::Bottom;
	case ETargetingSolutionIdentifier::Weapons:
	case ETargetingSolutionIdentifier::WeaponVulnerability:
		return FWeaponTargetingSolution::Front;
	case ETargetingSolutionIdentifier::Sensors:
	case ETargetingSolutionIdentifier::SensorVulnerability:
		return FWeaponTargetingSolution::Left;
	case ETargetingSolutionIdentifier::PowerManagement:
	case ETargetingSolutionIdentifier::PowerVulnerability:
		return FWeaponTargetingSolution::Top;
	case ETargetingSolutionIdentifier::DamageControl:
	case ETargetingSolutionIdentifier::DamageControlVulnerability:
		return FWeaponTargetingSolution::Right;
	case ETargetingSolutionIdentifier::Communications:
	case ETargetingSolutionIdentifier::CommunicationVulnerability:
		return FWeaponTargetingSolution::Right;
	default:
		return FWeaponTargetingSolution::NoFace;
	}
}

int8 UWeaponSystem::GetSolutionDifficulty(ETargetingSolutionIdentifier solution)
{
	if (solution >= ETargetingSolutionIdentifier::MIN_SYSTEM_VULNERABILITY && solution <= ETargetingSolutionIdentifier::MAX_SYSTEM_VULNERABILITY)
		return 7;

	if (solution >= ETargetingSolutionIdentifier::MIN_STANDARD_SYSTEM && solution <= ETargetingSolutionIdentifier::MAX_STANDARD_SYSTEM)
		return 4;

	if (solution == ETargetingSolutionIdentifier::MiscVulnerability)
		return 5;

	if (solution == ETargetingSolutionIdentifier::Misc)
		return 3;

	return 0;
}

/*
uint8 UWeaponSystem::DetermineDifficulty(uint8 baseDifficulty, FWeaponTargetingSolution::ETargetingFace bestFacing)
{
	uint8 difficulty = baseDifficulty;

	// Adjust difficulty to account for the target's best / worst face being the one pointed at the ship
	if (bestFacing == currentlyFacing)
	{
		if (difficulty > MIN_TARGETING_SEQUENCE_LENGTH)
			difficulty -= 2;
	}
	else if (bestFacing == -currentlyFacing) {
		difficulty += 2;
	}

	if (difficulty > MAX_TARGETING_SEQUENCE_LENGTH)
		return 0;

	if (difficulty < MIN_TARGETING_SEQUENCE_LENGTH)
		return MIN_TARGETING_SEQUENCE_LENGTH;

	return difficulty;
}
*/

UShipSystem::ESystem UWeaponSystem::GetSystemForSolution(ETargetingSolutionIdentifier solution)
{
	switch (solution)
	{
	case ETargetingSolutionIdentifier::Misc:
	case ETargetingSolutionIdentifier::MiscVulnerability:
		switch (FMath::RandRange(1, 7))
		{
		case 1:
			return UShipSystem::Helm;
		case 2:
			return UShipSystem::Warp;
		case 3:
			return UShipSystem::Weapons;
		case 4:
			return UShipSystem::Sensors;
		case 5:
			return UShipSystem::PowerManagement;
		case 6:
			return UShipSystem::DamageControl;
		case 7:
			return UShipSystem::Communications;
		default:
			return UShipSystem::ESystem::None;
		}

	case ETargetingSolutionIdentifier::Engines:
	case ETargetingSolutionIdentifier::EngineVulnerability:
		return UShipSystem::Helm;

	case ETargetingSolutionIdentifier::Warp:
	case ETargetingSolutionIdentifier::WarpVulnerability:
		return UShipSystem::Warp;

	case ETargetingSolutionIdentifier::Weapons:
	case ETargetingSolutionIdentifier::WeaponVulnerability:
		return UShipSystem::Weapons;

	case ETargetingSolutionIdentifier::Sensors:
	case ETargetingSolutionIdentifier::SensorVulnerability:
		return UShipSystem::Sensors;

	case ETargetingSolutionIdentifier::PowerManagement:
	case ETargetingSolutionIdentifier::PowerVulnerability:
		return UShipSystem::PowerManagement;

	case ETargetingSolutionIdentifier::DamageControl:
	case ETargetingSolutionIdentifier::DamageControlVulnerability:
		return UShipSystem::DamageControl;

	case ETargetingSolutionIdentifier::Communications:
		return UShipSystem::Communications;

	default:
		// TODO: determine how to handle targeting non-ships. Still use "misc" solution, but don't pick an actual ship system?
		return UShipSystem::ESystem::None;
	}
}

uint8 UWeaponSystem::GetDamageForSolution(ETargetingSolutionIdentifier solution, float percentageAwayFromPerfectAim)
{
	float damage = 0; 

	if (solution == ETargetingSolutionIdentifier::Misc)
		damage = FMath::FRandRange(15, 30);
	else if (solution == ETargetingSolutionIdentifier::MiscVulnerability)
		damage = FMath::FRandRange(35, 55);
	else if (solution >= ETargetingSolutionIdentifier::MIN_STANDARD_SYSTEM && solution <= ETargetingSolutionIdentifier::MAX_STANDARD_SYSTEM)
		damage = FMath::FRandRange(20, 40);
	else if (solution >= ETargetingSolutionIdentifier::MIN_SYSTEM_VULNERABILITY && solution <= ETargetingSolutionIdentifier::MAX_SYSTEM_VULNERABILITY)
		damage = FMath::FRandRange(55, 75);
	
	// scale damage based on how close percentageAwayFromPerfectAim is to 50
	if (percentageAwayFromPerfectAim <= 0.f)
	{
		// Do nothing; this is perfect so there's no reduction
	}
	else if (percentageAwayFromPerfectAim <= 0.275f)
	{
		damage *= 0.975f;
	}
	else if (percentageAwayFromPerfectAim <= 0.55f)
	{
		damage *= 0.95f;
	}
	else if (percentageAwayFromPerfectAim < 1.05f)
	{
		damage *= 0.9f;
	}
	else if (percentageAwayFromPerfectAim < 2.05f)
	{
		damage *= 0.8f;
	}
	else if (percentageAwayFromPerfectAim < 3.05f)
	{
		damage *= 0.65f;
	}
	else if (percentageAwayFromPerfectAim < 4.05f)
	{
		damage *= 0.5f;
	}
	else if (percentageAwayFromPerfectAim < 5.05f)
	{
		damage *= 0.3f;
	}
	else if (percentageAwayFromPerfectAim < 6.05f)
	{
		damage *= 0.1f;
	}
	else if (percentageAwayFromPerfectAim < 7.05f)
	{
		damage *= 0.025f;
	}
	else
	{
		return 0; // complete miss
	}

	// scale damage should by system power
	return (uint8)(damage * GetPowerLevel() / 100.f);
}