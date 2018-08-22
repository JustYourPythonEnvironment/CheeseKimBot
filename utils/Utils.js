const Attachment = require('discord.js').Attachment;
const errorPhrases = require('../assets/errorPhrases.json');
const UrlValidator = require('./UrlValidator.js');

logAndMsg = (channel, msg) => {
  console.log(msg);
  channel.send(msg);
};
getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
errAndMsg = (channel, err) => {
  console.error(err);
  channel.send(`${errorPhrases[getRandomIndex(errorPhrases)]} ${err}`);
};
archiveMedia = (message) => {
  console.log(message);
  const guild = message.guild;
  if (!guild) return;

  const embeds = message.embeds;
  const attachments = message.attachments;
  if (embeds) {
    console.log(embeds);
    embeds.forEach((embed) => {
      const ytMatch = UrlValidator.matchYTUrl(embed.url);
      const igMatch = UrlValidator.matchIGUrl(embed.url);
      const spMatch = UrlValidator.matchSpotifyUrl(embed.url);
      const vlMatch = UrlValidator.matchVLiveUrl(embed.url);
      if (ytMatch) {
        const ytChannel = guild.channels.find(ch => ch.name === 'youtube-links');
        if (ytChannel) ytChannel.send(ytMatch[0]);
      } else if (igMatch) {
        const igChannel = guild.channels.find(ch => ch.name === 'instagram-links');
        if (igChannel) igChannel.send(igMatch[0]);
      } else if (spMatch) {
        const spChannel = guild.channels.find(ch => ch.name === 'spotify-links');
        if (spChannel) spChannel.send(spMatch[0]);
      } else if (vlMatch) {
        const vliveChannel = guild.channels.find(ch => ch.name === 'vlive-links');
        if (vliveChannel) vliveChannel.send(vlMatch[0]);
      } else {
        const mediaChannel = guild.channels.find(ch => ch.name === 'media');
        if (mediaChannel) mediaChannel.send(embed.url);
      }
    });
  }
  if (attachments) {
    attachments.forEach((attachment) => {
      const mediaChannel = guild.channels.find(ch => ch.name === 'attachments');
      if (mediaChannel) mediaChannel.send(new Attachment(attachment.url));
    });
  }
};

module.exports = {
  logAndMsg,
  getRandomIndex,
  errAndMsg,
  archiveMedia,
};