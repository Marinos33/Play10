const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const { Queue } = require('../../globalResources/globalQueue.js');
const { Player } = require('../../globalResources/globalPlayer.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play the song given!')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('The URL of the song to play')
				.setRequired(true)),
	async execute(interaction) {
        //get url from given parameter
        const url = interaction.options.getString('url');

		if (!ytdl.validateURL(url)) {
			return await interaction.reply('Invalid YouTube URL provided. Please provide a valid YouTube URL.');
		}

        //get audio stream from url
		const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });

		const info = await ytdl.getBasicInfo(url);
		const title = info.videoDetails.title + " from " + info.videoDetails.author.name;

        //create resources and player
		const resource = createAudioResource(stream);

		const song = { resource, title };
		//if the player is already playing, add the resource to the queue
		if (Player.isPlaying()) {
			Queue.push(song);
			return await interaction.reply('Added the song to the queue');
		}

        Player.play(resource);
		Player.setSong(song);

		return await interaction.reply('Now Playing the song : \n' + title);
	},
};