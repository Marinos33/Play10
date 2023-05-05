const { SlashCommandBuilder } = require('discord.js');
const { PlayerFactory } = require("../../resources/playerFactory");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume the music'),
	async execute(interaction) {
            const guildId = interaction.guildId;

            const playerInstance = PlayerFactory.getPlayer(guildId);
            //if music is paused, resume the music
            if(playerInstance.isPaused()){
                playerInstance.resume();
                return await interaction.reply('Music has been resumed!');
            }
            
            return await interaction.reply('There is no music paused!');
	},
};