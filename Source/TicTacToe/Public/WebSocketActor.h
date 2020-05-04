// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "WebSockets/Public/IWebSocket.h"
#include "WebSocketActor.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FWebSocketMessageDelegate, const FString&, MessageString);
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FWebSocketConnectedDelegate);

UCLASS(Blueprintable)
class AWebSocketActor : public AActor
{
	GENERATED_BODY()

public:
	// Sets default values for this actor's properties
	AWebSocketActor();

	TSharedPtr<IWebSocket> WebSocket;

	UPROPERTY(BlueprintAssignable, Category = "WebSocket")
	FWebSocketMessageDelegate OnMessageEvent;

	UPROPERTY(BlueprintAssignable, Category = "WebSocket")
	FWebSocketConnectedDelegate OnConnectedEvent;

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	UFUNCTION(BlueprintCallable, Category = "WebSocket")
	void CreateWebSocket(FString Address);

	UFUNCTION(BlueprintCallable, Category = "WebSocket")
	void Send(FString Data);

	UFUNCTION(BlueprintCallable, Category = "WebSocket")
	void Connect();

	UFUNCTION(BlueprintCallable, Category = "WebSocket")
	bool IsConnected();
};
