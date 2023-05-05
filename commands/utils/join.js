const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');
const { PlayerFactory } = require("../../resources/playerFactory");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join the channel'),
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

		const guildId = interaction.guildId;

		const playerInstance = PlayerFactory.createPlayer(guildId);

		connection.subscribe(playerInstance.getPlayer());

		await interaction.reply('The bot has join the channel!');
	},
};