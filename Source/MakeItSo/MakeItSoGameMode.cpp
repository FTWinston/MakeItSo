#include "MakeItSoGameMode.h"
#include "MakeItSoPawn.h"
#include "ShipPlayerController.h"

AMakeItSoGameMode::AMakeItSoGameMode()
{
	// set input to use our custom controller
	PlayerControllerClass = AShipPlayerController::StaticClass();

	// set default pawn class to our flying pawn
	DefaultPawnClass = AMakeItSoPawn::StaticClass();
}
