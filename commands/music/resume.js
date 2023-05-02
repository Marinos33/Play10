const { SlashCommandBuilder } = require('discord.js');
const { Player } = require('../../globalResources/globalPlayer.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume the music'),
	async execute(interaction) {
            //if music is paused, resume the music
            if(Player.isPaused()){
                Player.resume();
                return await interaction.reply('Music has been resumed!');
            }
            return await interaction.reply('There is no music paused!');
	},
};