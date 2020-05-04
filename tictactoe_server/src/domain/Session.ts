import Player, {PlayerState} from "./Player";

export default class Session {

    constructor(private readonly players: Player[]) {
        for (let player of players) {
            player.state = PlayerState.WAITING_CONFIRMATION;
            player.removeAllListeners('message');
            player.on('message', this.onMessage);
            player.send('JOJO');
        }

    }

    onMessage(message: string) {
        console.log('session message', message);
    }
}
