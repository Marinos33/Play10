const { createAudioPlayer } = require('@discordjs/voice');

class Player {
    constructor(playerId) {
        this.playerId = playerId;
        this.player = createAudioPlayer();
        this.queue = [];

        this.player.addListener("stateChange", (oldOne, newOne) => {
            if (newOne.status === "idle") {
                this.playNext();
            }
        });
    }

    playNext() {
        if (this.queue.length > 0) {
            const song = this.queue.pop();
            this.player.play(song.resource);
            this.setSong(song);
        }
    }

    play(song){
        if (this.isPlaying()) {
            this.queue.push(song);
        } else {
            this.player.play(song.resource);
            this.setSong(song);
        }
    }

    isPlaying(){
        return this.player.state.status === 'playing';
    }

    isPaused(){
        return this.player.state.status === 'paused';
    }

    pause(){
        this.player.pause();
    }

    stop(){
        this.player.stop();
        this.queue = [];
    }

    resume(){
        this.player.unpause();
    }

    setSong(song){
        this.song = song;
    }

    getSong(){
        return this.song;
    }

    getPlayer(){
        return this.player;
    }
}

module.exports = {
    Player
};