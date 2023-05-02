const { createAudioPlayer } = require('@discordjs/voice');

class Player {
    static player = createAudioPlayer();
    static song = null;

    static getPlayer() {
        return this.player;
    }

    static play(resource){
        this.player.play(resource);
    }

    static isPlaying(){
        return this.player.state.status === 'playing';
    }

    static isPaused(){
        return this.player.state.status === 'paused';
    }

    static pause(){
        this.player.pause();
    }

    static stop(){
        this.player.stop();
    }

    static resume(){
        this.player.unpause();
    }

    static setSong(song){
        this.song = song;
    }

    static getSong(){
        return this.song;
    }
  }
  
  module.exports = {
    Player
  };