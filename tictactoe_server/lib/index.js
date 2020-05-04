"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Session_1 = __importDefault(require("./domain/Session"));
const Player_1 = require("./domain/Player");
const socket = new ws_1.Server({
    port: 8080
});
console.log('Server started');
const gameData = {
    clients: [],
    sessions: [],
    newClient(player) {
        const duplicate = this.clients.filter(client => client.username === player.username);
        if (duplicate.length !== 0) {
            player.send('duplicate name');
            console.log(`duplicate name ${player.username}`);
        }
        else {
            this.clients.push(player);
            player.send('OK');
            const inQueue = this.clients
                .filter(client => client.state === Player_1.PlayerState.IN_QUEUE);
            if (inQueue.length >= 2) {
                const player1 = inQueue[0];
                const player2 = inQueue[1];
                console.log(`new session ${player1.username} and ${player2.username}`);
                new Session_1.default([player1, player2]);
            }
        }
    }
};
socket.on('connection', (ws) => {
    ws.on('message', (username) => {
        let player = ws;
        player.username = username;
        player.state = Player_1.PlayerState.IN_QUEUE;
        gameData.newClient(player);
    });
    console.log('client connected');
});
socket.on('message', function incoming(data) {
    console.log(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBcUM7QUFFckMsK0RBQXVDO0FBQ3ZDLDRDQUFvRDtBQUVwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQU0sQ0FBQztJQUN0QixJQUFJLEVBQUUsSUFBSTtDQUNiLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUU5QixNQUFNLFFBQVEsR0FBYTtJQUN2QixPQUFPLEVBQUUsRUFBRTtJQUNYLFFBQVEsRUFBRSxFQUFFO0lBQ1osU0FBUyxDQUFDLE1BQWM7UUFDcEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRixJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztpQkFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxvQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdELElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsT0FBTyxDQUFDLFFBQVEsUUFBUSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDdkUsSUFBSSxpQkFBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDbkM7U0FDSjtJQUNMLENBQUM7Q0FDSixDQUFDO0FBRUYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFhLEVBQUUsRUFBRTtJQUN0QyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQWdCLEVBQUUsRUFBRTtRQUNsQyxJQUFJLE1BQU0sR0FBVyxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDM0IsTUFBTSxDQUFDLEtBQUssR0FBRyxvQkFBVyxDQUFDLFFBQVEsQ0FBQztRQUNwQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxRQUFRLENBQUMsSUFBSTtJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDIn0=