const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play the song given!'),
	async execute(interaction) {
        const member = interaction.member;
		const voiceChannel = member.voice.channel;
		if (!voiceChannel) {
			return interaction.reply('You need to be in a voice channel to use this command.');
		}

		joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		});

		await interaction.reply('Joined the voice channel!');
	},
};