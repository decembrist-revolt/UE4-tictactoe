import WebSocket from 'ws';
import Session from "./Session";
import Player from "./Player";

export default interface GameData {
    clients: WebSocket[],
    sessions: Session[],
    newClient(client: Player);
}
