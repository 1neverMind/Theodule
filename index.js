const { Client, Collection, Events, Message, GatewayIntentBits, REST, Routes } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, VoiceConnectionStatus, } = require('@discordjs/voice');
const conf = require("./config.json");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,           // pour les slash commandes
    GatewayIntentBits.GuildMessages,    // pour recevoir les messages envoyés
    GatewayIntentBits.MessageContent    // pour lire le contenu des messages
  ]
});
const fs = require('node:fs');
const path = require('node:path');
//const commandDeploy = require('./deploy-commands.js'),

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  client.users.send('353601027720871946', 'bordel');
});

client.on(Events.InteractionCreate, 
async interaction => {
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
      await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
    }
  }
});


client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().includes("sexe")) {
    message.channel.send("🐔 Cot cot codet !");
  }

  if (message.content.toLowerCase().includes("theodule viens")) {
    /*const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply("Tu dois être dans un salon vocal !");
    }*/

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator
    });
    try {
      // Attendre que la connexion soit prête
      await entersState(connection, VoiceConnectionStatus.Ready, 5_000);
  console.log('entersState');
      const player = createAudioPlayer();
      const resource = createAudioResource(path.join(__dirname, './p.mp3'));
  console.log('player ressource');
      connection.subscribe(player);
      player.play(resource);
  console.log('ressource played');
      player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy(); // Déconnecte le bot une fois le son terminé
      });
  console.log('connextion exit');
      message.reply('🐔 Cot cot cot ! Je parle maintenant.');
    } catch (error) {
      console.error(error);
      message.reply("Erreur lors de la lecture de l'audio.");
      connection.destroy();
    }

  }

});



client.login(conf.token);


