const Discord = require('discord.js');
const auth = require('./auth.json');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  if (message.content.endsWith('Sana!')) {
    message.channel.send('Shy shy shy!');
  }
});

client.login(auth.token);
