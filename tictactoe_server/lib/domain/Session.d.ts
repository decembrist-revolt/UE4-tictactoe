import Player from "./Player";
export default class Session {
    private readonly players;
    constructor(players: Player[]);
    onMessage(message: string): void;
}
