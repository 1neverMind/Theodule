const Discord = require("discord.js");
const config = require("./config.json");
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = ';';

client.on("message", function(message) {
	if (message.author.bot) return;

  // NON-PREFIX COMMANDS

  if (message.content == "ce sale weeb de merde") message.reply("hilaire");
  if (message.content == "feur") message.reply('Ta geule');
  if (message.content == "furry") message.react('☠️');
  if (message.content == "lol") message.reply("i");
  if (message.content == "youn") {
    for(var i = 0;i<1;i++){
      message.channel.send(`@${Sky#9432}`);
    }
  }
  if (message.content == "loli") {message.react('💖');message.react('💖');message.react('👮')}
  //if (message.author == "353601027720871946") message.react('🙏'); //author : moi
  //if (message.author == "301090610226397186") message.react('💖'); //author : Matis
  if (message.author == "429656936435286016") {message.react('🇳');message.react('🇦');message.react('🇷');message.react('🇺');message.react('🇹');message.react('🇴');};
  if (message.content.length > 150) message.reply("T'écris beaucoup mashallah.");

  // PREFIX COMMANDS

  if (!message.content.startsWith(prefix)) return;
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "suce") {
  	message.reply('non.');
  }

  if (command === "rand") {
		message.channel.send("Choisis le nombre minimum chacal");
  }

  if (command === "m") {
    message.channel.send("oui");
    const filter = (reaction, user) => reaction.emoji.name === '💖' && user.id === message.author
      message.awaitReactions(filter)
        .then(collected => message.channel.send('Sale pd'))
        .catch(console.error);
  }


});



client.login(config.BOT_TOKEN);


