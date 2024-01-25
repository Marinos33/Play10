// server side code, may change depending on the host
/*const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
  console.log(`Play10 Bot listening at http://localhost:${port}`),
);
*/
// ================= START BOT CODE ===================
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const { PlayerFactory } = require('./resources/playerFactory');
const { getVoiceConnection } = require('@discordjs/voice');

require('dotenv').config(); //get the env variables

const clientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
};

const client = new Client(clientOptions);

client.commands = new Collection(); //create list of commands

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

//setup commands
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

client.on(Events.ClientReady, () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  } else {
    console.log(`Logged in, but user is not available.`);
  }
});

//on bot leaving, kick or banned stop the music
client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  //if got kick, banned or leave
  if (newState.member?.user.bot && newState.channelId === null) {
    const guildId = newState.guild.id;
    const playerInstance = PlayerFactory.getPlayer(guildId);
    if (playerInstance) {
      playerInstance.stop();
      PlayerFactory.removePlayer(guildId);
    }

    const connectionVoice = getVoiceConnection(oldState.guild.id);
    if (connectionVoice) {
      connectionVoice.destroy();
    }
  }

  //if the bot is alone in the channel, leave
  if (oldState.channel && oldState.channel.members.size === 1) {
    const connectionVoice = getVoiceConnection(oldState.guild.id);
    if (connectionVoice) {
      connectionVoice.destroy();
    }
  }
});

//on command written in chat
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  //log event
  //get the option query if exist
  let optionQuery = '';
  if (interaction.options) {
    optionQuery = interaction.options.data
      .map((option) => {
        return `${option.name}: ${option.value}`;
      })
      .join(', ');
  }

  const logString = `[${interaction.user.tag} executed ${interaction.commandName} ${optionQuery} in ${interaction.guild.name})]`;
  writeToLogFile(logString);

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
});

//on bot crash, restart it
client.on(Events.ClientError, async (error) => {
  console.error(error);

  //write error to log
  const errorMsg = `[ERROR] ${error.message}`;
  writeToLogFile(errorMsg);

  client.destroy();

  process.exit(0);
});

client.login(process.env.BOT_TOKEN);

function writeToLogFile(logString) {
  const date = new Date();
  const dateString = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const logFolderPath = path.join(__dirname, 'logs');

  if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath);
  }

  const logFileName = `log - ${dateString}.txt`;
  const logFilePath = path.join(logFolderPath, logFileName);

  const existingLogs = fs.existsSync(logFilePath)
    ? fs.readFileSync(logFilePath, 'utf8')
    : '';
  const newContent = `[${getFormattedTime(
    date,
  )}] ${logString}\n${existingLogs}`;

  fs.writeFileSync(logFilePath, newContent);
}

function getFormattedTime(date) {
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}
