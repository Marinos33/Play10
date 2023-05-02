const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const { Queue } = require('../../globalQueue.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play the song given!')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('The URL of the song to play')
				.setRequired(true)),
	async execute(interaction) {
		const member = interaction.member;
		const voiceChannel = member.voice.channel;
		if (!voiceChannel) {
			return await interaction.reply('You need to be in a voice channel to use this command.');
		}

		const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		});

        //get url from given parameter
        const url = interaction.options.getString('url');

		if (!ytdl.validateURL(url)) {
			return await interaction.reply('Invalid YouTube URL provided. Please provide a valid YouTube URL.');
		}

        //get audio stream from url
		const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });

        //create resources and player
		const resource = createAudioResource(stream);
		const player = createAudioPlayer();

        player.play(resource);

		connection.subscribe(player);

		await interaction.reply('Now Playing the song from the given URL!');
	},
};