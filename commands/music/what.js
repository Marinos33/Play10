const { SlashCommandBuilder } = require('discord.js');
const { PlayerFactory } = require("../../resources/playerFactory");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('what')
    .setDescription('Tell you what is currently playing'),
  async execute(interaction) {
    const guildId = interaction.guildId;

    const playerInstance = PlayerFactory.getPlayer(guildId);

    try {
      const song = playerInstance.getSong();

      if (!song) {
        return await interaction.reply('There is no music playing!');
      }

      const title = song.title;

      return await interaction.reply('Currently playing ' + title);
    } catch (e) {
      console.log(e)
      return await interaction.reply('Something wen wrong');
    }
  },
};


