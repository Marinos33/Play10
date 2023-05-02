const { SlashCommandBuilder } = require('discord.js');
const { Player } = require('../../globalResources/globalPlayer.js');
const { Queue } = require('../../globalResources/globalQueue.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		//stop the music and clear the queue
		if(Player.isPlaying()){
			Player.stop();
			Queue.clear();
			return await interaction.reply('Music has been stopped!');
		}
		return await interaction.reply('There is no music playing!');
	},
};