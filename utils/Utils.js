const errorPhrases = require('../assets/errorPhrases.json');

logAndMsg = (channel, msg) => {
    // console.log(msg);
    channel.send(msg);
};
getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
errAndMsg = (channel, err) => {
    console.error(err);
    channel.send(`${errorPhrases[getRandomIndex(errorPhrases)]} ${err}`);
};


module.exports = {
    logAndMsg,
    getRandomIndex,
    errAndMsg,
};
