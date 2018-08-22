const Utils = require('../utils/Utils.js');

module.exports = async (client, oldMessage, newMessage) => {
  if (newMessage.author.bot) return;
  Utils.archiveMedia(newMessage);
  return;
};