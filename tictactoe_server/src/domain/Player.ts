import WebSocket from 'ws';

export default interface Player extends WebSocket {
    username: string;
    state: PlayerState;
}

export enum PlayerState {
    IN_QUEUE,
    WAITING_CONFIRMATION,
    PLAYING
}
