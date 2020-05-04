"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
class Session {
    constructor(players) {
        this.players = players;
        for (let player of players) {
            player.state = Player_1.PlayerState.WAITING_CONFIRMATION;
            player.removeAllListeners('message');
            player.on('message', this.onMessage);
            player.send('JOJO');
        }
    }
    onMessage(message) {
        console.log('session message', message);
    }
}
exports.default = Session;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb21haW4vU2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUE2QztBQUU3QyxNQUFxQixPQUFPO0lBRXhCLFlBQTZCLE9BQWlCO1FBQWpCLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFDMUMsS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDeEIsTUFBTSxDQUFDLEtBQUssR0FBRyxvQkFBVyxDQUFDLG9CQUFvQixDQUFDO1lBQ2hELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2QjtJQUVMLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBZTtRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDSjtBQWZELDBCQWVDIn0=