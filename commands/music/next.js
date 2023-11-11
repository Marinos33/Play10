const { SlashCommandBuilder } = require('discord.js');
const { PlayerFactory } = require('../../resources/playerFactory');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('next')
    .setDescription('Play the next music in the queue'),
  async execute(interaction) {
    const guildId = interaction.guildId;

    const playerInstance = PlayerFactory.getPlayer(guildId);

    try {
      const music = playerInstance.queue.pop();

      if (!music) {
        return await interaction.reply('There is no music in the queue!');
      }

      playerInstance.getPlayer().play(music.resource);
      playerInstance.setSong(music);

      return await interaction.reply('Now Playing the next song');
    } catch (e) {
      console.log(e);
      return await interaction.reply('Something went wrong');
    }
  },
};
