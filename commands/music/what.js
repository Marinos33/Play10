const { SlashCommandBuilder } = require('discord.js');
const { Player } = require('../../globalResources/globalPlayer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('what')
		.setDescription('Tell you what is currently playing'),
	async execute(interaction) {
        const song = Player.getSong();

        if (!song) {
            return await interaction.reply('There is no music playing!');
        }
        
        const title = song.title;

		return await interaction.reply('Currently playing ' + title);
	},
};
