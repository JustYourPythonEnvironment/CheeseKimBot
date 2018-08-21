require('dotenv').config();
const Discord = require('discord.js');
const UrlValidator = require('./utils/UrlValidator.js');
const Utils = require('./utils/Utils.js');

const discordToken = process.env.DISCORD_TOKEN;

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready!');
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  if (!channel) return;
  channel.send(`Annyeonghaseyo ${member}!`);
});

client.on('message', message => {
  if (message.author.bot) return;

  const tokens = message.content.split(' ');
  if (tokens.length > 1 && tokens[0] === 'kimbap') {
    switch(tokens[1]) {
      case 'create-role': {
        const guild = message.guild;
        if (tokens.length < 3 || !guild) {
          message.channel.send('Neomuhae!');
          break;
        }
        guild.createRole({
            name: tokens[2],
            color: tokens[3],
          })
          .then(role => Utils.logAndMsg(message.channel, `Created new role with name ${role.name} and color ${role.color}`))
          .catch(err => Utils.errAndMsg(message.channel, err));
        break;
      }
      case 'delete-role': {
        const guild = message.guild;
        if (tokens.length < 2 || !guild) {
          message.channel.send('Neomuhae!');
          break;
        }
        guild.roles.find(role => role.name === tokens[2]).delete()
          .then(deleted => Utils.logAndMsg(message.channel, `Deleted role ${deleted.name}`))
          .catch(err => Utils.errAndMsg(message.channel, err));
        break;
      }
      case 'add-role': {
        const member = message.member;
        if (tokens.length < 2 || !member) {
          message.channel.send('Neomuhae!');
          break;
        }
        member.addRole(member.guild.roles.find(role => role.name === tokens[2]))
          .then(member => Utils.logAndMsg(message.channel, `Added role ${tokens[2]} to ${member.displayName}`))
          .catch(err => Utils.errAndMsg(message.channel, err));
        break;
      }
      case 'remove-role': {
        const member = message.member;
        if (tokens.length < 2 || !member) {
          message.channel.send('Neomuhae!');
          break;
        }
        member.removeRole(member.guild.roles.find(role => role.name === tokens[2]))
          .then(member => Utils.logAndMsg(message.channel, `Removed role ${tokens[2]} to ${member.displayName}`))
          .catch(err => Utils.errAndMsg(message.channel, err));
        break;
      }
      default:
        message.channel.send('Neomuhae!');
    }
    return;
  }

  if (message.content.endsWith('Sana!')) {
    message.channel.send('Shy shy shy!');
  }

  const ytMatch = UrlValidator.matchYTUrl(message.content);
  const igMatch = UrlValidator.matchIGUrl(message.content);
  const spMatch = UrlValidator.matchSpotifyUrl(message.content);
  const vlMatch = UrlValidator.matchVLiveUrl(message.content);
  if (ytMatch) {
    const ytChannel = client.channels.find(ch => ch.name === 'youtube-links');
    if (ytChannel) ytChannel.send(ytMatch[0]);
  }
  if (igMatch) {
    const igChannel = client.channels.find(ch => ch.name === 'instagram-links');
    if (igChannel) igChannel.send(igMatch[0]);
  }
  if (spMatch) {
    const spChannel = client.channels.find(ch => ch.name === 'spotify-links');
    if (spChannel) spChannel.send(spMatch[0]);
  }
  if (vlMatch) {
    const vliveChannel = client.channels.find(ch => ch.name === 'vlive-links');
    if (vliveChannel) vliveChannel.send(vlMatch[0]);
  }
});

client.login(discordToken);
