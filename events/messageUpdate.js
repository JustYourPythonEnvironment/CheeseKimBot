const Actions = require('../utils/Actions.js');

module.exports = async (client, oldMessage, newMessage) => {
  if (newMessage.author.bot) return;
  Actions.archiveMedia(newMessage);
  return;
};