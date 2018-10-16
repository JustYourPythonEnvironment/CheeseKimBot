const errorPhrases = require('../assets/errorPhrases.json');

const logAndMsg = (channel, msg) => {
  console.log(msg);
  channel.send(msg);
};

const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const errAndMsg = (channel, err) => {
  console.error(err);
  channel.send(`${errorPhrases[getRandomIndex(errorPhrases)]} ${err}`);
};

// There is actually a character in here to make Discord believe it's not sending an empty message.
const sendBlankLine = async channel => await channel.send('­');

// Hack to tag authors but not notify them.
const sendSilentTag = async (channel, msg) => {
  const placeholder = await channel.send('...');
  placeholder.edit(msg);
}

module.exports = {
  logAndMsg,
  getRandomIndex,
  errAndMsg,
  sendBlankLine,
  sendSilentTag,
};
