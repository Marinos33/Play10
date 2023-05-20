const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { PlayerFactory } = require("../../resources/playerFactory");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play the song given!')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('The URL of the song to play')
        .setRequired(true)),
  async execute(interaction) {

    //if the bot is not in a voice channel return message
    const isBotInVoiceChannel = interaction.guild.channels.cache.some(channel => channel.type === 'GUILD_VOICE' && channel.members.has(Client.user.id));
    if (!isBotInVoiceChannel) {
      return await interaction.reply('The bot is not in a voice channel. Please use the /join command to make the bot join the channel.');
    }

    //get url from given parameter
    const url = interaction.options.getString('url');

    if (!ytdl.validateURL(url)) {
      return await interaction.reply('Invalid YouTube URL provided. Please provide a valid YouTube URL.');
    }

    try {
      //get audio stream from url
      const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });

      const info = await ytdl.getBasicInfo(url);
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
      console.log(e)
      return await interaction.reply('Something wen wrong');
    }
  },
};