const Discord = require('discord.js');
const auth = require('./auth.json');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready!');
});

client.login(auth.token);