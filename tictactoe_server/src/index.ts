import WebSocket, {Server} from 'ws';
import GameData from "./domain/GameData";
import Session from "./domain/Session";
import Player, {PlayerState} from "./domain/Player";

const socket = new Server({
    port: 8080
});

console.log('Server started');

const gameData: GameData = {
    clients: [],
    sessions: [],
    newClient(player: Player) {
        const duplicate = this.clients.filter(client => client.username === player.username);
        if (duplicate.length !== 0) {
            player.send('duplicate name');
            console.log(`duplicate name ${player.username}`);
        } else {
            this.clients.push(player);
            player.send('OK');
            const inQueue = this.clients
                .filter(client => client.state === PlayerState.IN_QUEUE);
            if (inQueue.length >= 2) {
                const player1 = inQueue[0];
                const player2 = inQueue[1];
                console.log(`new session ${player1.username} and ${player2.username}`);
                new Session([player1, player2]);
            }
        }
    }
};

socket.on('connection', (ws: WebSocket) => {
    ws.on('message', (username: string) => {
        let player = <Player>ws;
        player.username = username;
        player.state = PlayerState.IN_QUEUE;
        gameData.newClient(player);
    });
    console.log('client connected');
});

socket.on('message', function incoming(data) {
    console.log(data);
});
