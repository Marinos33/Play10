const { Player } = require('../model/player');

class PlayerFactory {
  static players = {};

  static createPlayer(id) {
    if (!this.players[id]) {
      const player = new Player(id);
      this.players[id] = player;
      return player;
    }
    return this.players[id];
  }

  static getPlayer(id) {
    if (!this.players[id]) {
      return this.createPlayer(id);
    }

    return this.players[id];
  }

  static removePlayer(id) {
    if (this.players[id]) {
      delete this.players[id];
    }
  }
}

module.exports = {
  PlayerFactory
};