const { Player } = require('../model/player');

class PlayerFactory {
    static players = {};

    static createPlayer(id) {
        if (this.players[id]) {
            throw new Error(`Player with id ${id} already exists`);
        }

        const player = new Player(id);
        this.players[id] = player;
        return player;
    }

    static getPlayer(id) {
        if (!this.players[id]) {
            throw new Error(`Player with id ${id} does not exist`);
        }

        return this.players[id];
    }

    static removePlayer(id) {
        if (!this.players[id]) {
            throw new Error(`Player with id ${id} does not exist`);
        }

        delete this.players[id];
    }
}

module.exports = {
    PlayerFactory
};