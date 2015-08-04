// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.

#include "MakeItSo.h"
#include "MakeItSoGameMode.h"
#include "MakeItSoPawn.h"

AMakeItSoGameMode::AMakeItSoGameMode()
{
	// set default pawn class to our flying pawn
	DefaultPawnClass = AMakeItSoPawn::StaticClass();
}
