const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Events, Collection  }  = require("discord.js");
const { PlayerFactory } = require("./resources/playerFactory");
const { getVoiceConnection } = require('@discordjs/voice');

require('dotenv').config() //get the env variables

const clientOptions = {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
    ]
};

const client = new Client(clientOptions);

client.commands = new Collection(); //create list of commands

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

//setup commands
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
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
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

//on bot crash, restart it
client.on(Events.ClientError, async error => {
	console.error(error);
	client.destroy();
  
	process.exit(0);
});

client.login(process.env.BOT_TOKEN);
