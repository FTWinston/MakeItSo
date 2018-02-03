#include "MenuGameMode.h"
#include "MenuPawn.h"
#include "ShipPlayerController.h"


AMenuGameMode::AMenuGameMode()
{
	PlayerControllerClass = AShipPlayerController::StaticClass();

	DefaultPawnClass = AMenuPawn::StaticClass();
}
