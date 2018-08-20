const Discord = require('discord.js');
const discordToken = process.env.discordToken || require('./auth.json').discordToken;
const client = new Discord.Client();
const UrlValidator = require('./utils/UrlValidator.js');

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  if (message.author.bot) return;

  if (message.content.endsWith('Sana!')) {
    message.channel.send('Shy shy shy!');
  }

  const ytMatch = UrlValidator.matchYTUrl(message.content);
  const igMatch = UrlValidator.matchIGUrl(message.content);
  const spMatch = UrlValidator.matchSpotifyUrl(message.content);
  const vlMatch = UrlValidator.matchVLiveUrl(message.content);
  if (ytMatch) {
    client.channels.find(ch => ch.name === 'youtube-links').send(ytMatch[0]);
  }
  if (igMatch) {
    client.channels.find(ch => ch.name === 'instagram-links').send(igMatch[0]);
  }
  if (spMatch) {
    client.channels.find(ch => ch.name === 'spotify-links').send(spMatch[0]);
  }
  if (vlMatch) {
    client.channels.find(ch => ch.name === 'vlive-links').send(vlMatch[0]);
  }

  const tokens = message.content.split(' ');
  if (tokens.length > 1 && tokens[0] === 'kimbap') {
    switch(tokens[1]) {
      case 'create-role':
        if (tokens.length < 3) {
          message.channel.send('Neomuhae!');
          break;
        }
        message.guild.createRole({
            name: tokens[2],
            color: tokens[3],
          })
          .then(role => {
            console.log(`Created new role with name ${role.name} and color ${role.color}`);
            message.channel.send(`Created new role with name ${role.name} and color ${role.color}`);
          })
          .catch(err => {
            console.error(err);
            message.channel.send(`Neomuhae! ${err}`);
          });
        break;
      default:
        message.channel.send('Neomuhae!');
    }
  }
});

client.login(discordToken);
