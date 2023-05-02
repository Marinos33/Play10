const { SlashCommandBuilder } = require('discord.js');
const { Player } = require('../../globalResources/globalPlayer');
const { Queue } = require('../../globalResources/globalQueue');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('List the songs in the queue'),
	async execute(interaction) {
        const queue = Queue.getQueue();

		if (!queue.length) {
			return await interaction.reply('There is no music in the queue!');
		}

        const titles = queue.map(song => song.title);

		//format the titles into a string with newlines between each title
		const titleString = titles.reduce((acc, title) => acc + '\n' + title);

		return await interaction.reply('Playlist: \n' + titleString);
	},
};
