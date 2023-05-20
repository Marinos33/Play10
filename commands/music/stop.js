const { SlashCommandBuilder } = require('discord.js');
const { PlayerFactory } = require("../../resources/playerFactory");


module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the bot from playing music'),
  async execute(interaction) {
    const guildId = interaction.guildId;

    const playerInstance = PlayerFactory.getPlayer(guildId);

    try {
      //stop the music and clear the queue
      if (playerInstance.isPlaying()) {
        playerInstance.stop();
        playerInstance.queue = [];
        return await interaction.reply('Music has been stopped!');
      }

      return await interaction.reply('There is no music playing!');
    } catch (e) {
      console.log(e)
      return await interaction.reply('Something wen wrong');
    }
  },
};

