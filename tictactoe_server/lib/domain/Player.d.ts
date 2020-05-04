import WebSocket from 'ws';
export default interface Player extends WebSocket {
    username: string;
    state: PlayerState;
}
export declare enum PlayerState {
    IN_QUEUE = 0,
    WAITING_CONFIRMATION = 1,
    PLAYING = 2
}
