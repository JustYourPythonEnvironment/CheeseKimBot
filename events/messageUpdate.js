const Actions = require('../utils/Actions.js');

module.exports = async (client, oldMessage, newMessage) => {
  if (newMessage.author.bot) return;
  // only archive new message if message embeds change to avoid cluttering
  let isSame = false;
  if (oldMessage.embeds.length === newMessage.embeds.length) {
    isSame = true;
    oldMessage.embeds.forEach((embed, i) => {
      if (embed.url !== newMessage.embeds[i].url) {
        isSame = false;
      }
    });
  }
  if (!isSame) Actions.archiveMedia(newMessage);
  return;
};