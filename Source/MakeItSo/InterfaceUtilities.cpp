// Fill out your copyright notice in the Description page of Project Settings.

#include "MakeItSo.h"
#include "InterfaceUtilities.h"

#ifdef WIN32
#include "AllowWindowsPlatformTypes.h"
#include "winsock.h"
#include "HideWindowsPlatformTypes.h"
#endif

#define _CRT_SECURE_NO_WARNINGS
char client_ipstring[255];

FString InterfaceUtilities::GetLocalIP()
{
#ifdef WIN32
	WSADATA wsaData;
	WORD wVersionRequested = MAKEWORD(2, 0); // previously was 1, 1
	
	if (::WSAStartup(wVersionRequested, &wsaData) != 0)
		return FString(TEXT("ERROR_NO_WINSOCK"));
	
	char hostname[255];
	if (gethostname(hostname, sizeof(hostname)) == SOCKET_ERROR)
	{
		WSACleanup();
		return FString(TEXT("ERROR_GET_HOST"));
	}
	
	struct hostent *host = gethostbyname(hostname);
	
	if (host == NULL)
	{
		WSACleanup();
		return FString(TEXT("ERROR_NO_HOST"));
	}

	char *ip = inet_ntoa(*(struct in_addr *)host->h_addr);
	sprintf(client_ipstring, ip);

	WSACleanup();
	
	return FString(client_ipstring);
#endif
}