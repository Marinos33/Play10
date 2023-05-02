const { SlashCommandBuilder } = require('discord.js');
const { Player } = require('../../globalResources/globalPlayer.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the music'),
	async execute(interaction) {
		
			//if music is playing pause the music
			if(Player.isPlaying()){
				Player.pause();
				return await interaction.reply('Music has been paused!');
			}

			return await interaction.reply('There is no music playing!');
	},
};