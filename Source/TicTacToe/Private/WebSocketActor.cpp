// Fill out your copyright notice in the Description page of Project Settings.


#include "WebSocketActor.h"
#include "Modules/ModuleManager.h"
#include "WebSockets/Public/WebSocketsModule.h"
#include "WebSockets/Public/IWebSocket.h"

// Sets default values
AWebSocketActor::AWebSocketActor()
{
	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;
}

// Called when the game starts or when spawned
void AWebSocketActor::BeginPlay()
{
	Super::BeginPlay();
}

// Called every frame
void AWebSocketActor::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}

void AWebSocketActor::CreateWebSocket(FString Address)
{
#if WEBSOCKETS_PACKAGE==1
	UE_LOG(LogTemp, Warning, TEXT("WEBSOCKETS_PACKAGE=1")); //prints in all cases
#endif

#if defined(WITH_WEBSOCKETS)
#if WEBSOCKETS_PACKAGE==1
	UE_LOG(LogTemp, Warning, TEXT("WEBSOCKETS_PACKAGE=1")); //prints in all cases
#endif
#endif

#if defined(WITH_LIBWEBSOCKETS)
#if WITH_LIBWEBSOCKETS==1
	UE_LOG(LogTemp, Warning, TEXT("WITH_LIBWEBSOCKETS=1")); //prints in all cases
#endif
#endif

	FModuleManager::Get().LoadModule("WebSockets");
	FWebSocketsModule * WsModule = &FWebSocketsModule::Get();
	if (WsModule == nullptr)
	{
		UE_LOG(LogTemp, Error, TEXT("WebSocketsModule is null"));
		WebSocket = nullptr;
	}
	else
	{
		UE_LOG(LogTemp, Log, TEXT("WebSocketsModule is valid"));

		TMap<FString, FString> Headers;

		WebSocket = WsModule->CreateWebSocket(Address, TEXT("NULL"), Headers);

		WebSocket->OnMessage().AddLambda([&](FString MessageText)
		{
			OnMessageEvent.Broadcast(MessageText);
		});

		WebSocket->OnConnected().AddLambda([&]()
		{
			OnConnectedEvent.Broadcast();
		});
	}
}

void AWebSocketActor::Send(FString Data)
{
	WebSocket->Send(Data);
}

void AWebSocketActor::Connect()
{
	WebSocket->Connect();
}

bool AWebSocketActor::IsConnected()
{
	return WebSocket->IsConnected();
}
