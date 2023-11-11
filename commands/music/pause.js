const { SlashCommandBuilder } = require('discord.js');
const { PlayerFactory } = require('../../resources/playerFactory');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the music'),
  async execute(interaction) {
    const guildId = interaction.guildId;

    const playerInstance = PlayerFactory.getPlayer(guildId);

    try {
      //if music is playing pause the music
      if (playerInstance.isPlaying()) {
        playerInstance.pause();
        return await interaction.reply('Music has been paused!');
      }

      return await interaction.reply('There is no music playing!');
    } catch (e) {
      console.log(e);
      return await interaction.reply('Something went wrong');
    }
  },
};
