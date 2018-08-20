const Discord = require('discord.js');
const auth = require('./auth.json');
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
});

client.login(auth.discordToken);
