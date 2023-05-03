const { createAudioPlayer } = require('@discordjs/voice');
const { Queue } = require('./globalQueue.js');

class Player {
    static player = createAudioPlayer();
    static song = null;

    static getPlayer() {
        return this.player;
    }

    static play(song){
        this.player.play(song.resource);
		this.setSong(song);

		this.player.addListener("stateChange", (oldOne, newOne) => {
			if (newOne.status === "idle") {
				if (Queue.length() > 0) {
					const nextSong = Queue.pop();
					this.player.play(nextSong.resource);
					this.setSong(song);
				}
			}
		});
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