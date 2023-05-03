const { SlashCommandBuilder } = require('discord.js');
const { Queue } = require('../../globalResources/globalQueue.js');
const { Player } = require('../../globalResources/globalPlayer.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('next')
		.setDescription('Play the next music in the queue'),
	async execute(interaction) {
		const music = Queue.pop();

		if (!music) {
			return await interaction.reply('There is no music in the queue!');
		}
		
		Player.play(music.resource);

		return await interaction.reply('Now Playing the next song');
	},
};