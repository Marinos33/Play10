const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource } = require('@discordjs/voice');
const ytdl = require('@distube/ytdl-core');
const { PlayerFactory } = require('../../resources/playerFactory');
const { writeToLogFile, writeErrorToLogFile } = require('../utils/logger');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play the song given!')
    .addStringOption((option) =>
      option
        .setName('url')
        .setDescription('The URL of the song to play')
        .setRequired(true),
    ),
  async execute(interaction) {
    const botMember = interaction.guild.members.cache.get(
      interaction.client.user.id,
    );
    const botVoiceChannel = botMember.voice.channel;
    const userVoiceChannel = interaction.member.voice.channel;

    //check if the bot is in a voice channel
    if (!botVoiceChannel || botVoiceChannel !== userVoiceChannel) {
      return await interaction.reply(
        'The bot is not in a voice channel. Please use the /join command to make the bot join the channel.',
      );
    }

    //get url from given parameter
    const url = interaction.options.getString('url');

    if (!ytdl.validateURL(url)) {
      return await interaction.reply(
        'Invalid YouTube URL provided. Please provide a valid YouTube URL.',
      );
    }

    try {
      const youtubeCookies = JSON.parse(fs.readFileSync('cookies.json'));

      const agent = ytdl.createAgent(youtubeCookies);

      //get audio stream from url
      const stream = ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio',
        agent: agent,
        highWaterMark: 1 << 25, // Adjust the buffer size
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0', // Spoof a browser user agent
          },
        },
      });

      const info = await ytdl.getBasicInfo(url, { agent });

      const title = `${info.videoDetails.title} from ${info.videoDetails.author.name}`;

      //create resources and player
      const resource = createAudioResource(stream);

      const song = { resource, title };

      const playerInstance = PlayerFactory.getPlayer(interaction.guildId);

      //if the player is already playing, add the resource to the queue
      if (playerInstance.isPlaying()) {
        playerInstance.queue.push(song);
        return await interaction.reply('Added the song to the queue');
      }

      playerInstance.play(song);

      return await interaction.reply('Now Playing the song : \n' + title);
    } catch (e) {
      console.log(e);

      writeErrorToLogFile(e.stack);

      return await interaction.reply('Something went wrong');
    }
  },
};
