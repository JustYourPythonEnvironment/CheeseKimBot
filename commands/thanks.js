const helpEmbed = require('../embeds/helpEmbed.js');
const Utils = require('../utils/Utils.js');
const { HELP, HELP_SHORT } = require('../assets/flags.json');

const configuration = {
    enabled: true,
    name: 'thanks',
    aliases: [ '' ],
    description: 'Say thank you to CheeseKimBot',
    usage: 'thanks',
};

module.exports = {
    conf: configuration,

    run: async (client, message, args) => {
        const member = message.member;

        if (args[0] === HELP || args[0] === HELP_SHORT || !member) {
            helpEmbed(message, configuration);
            Utils.errAndMsg(message.channel, 'Invalid arguments.');
        } else {
            try {
                message.react("❤");
                Utils.logAndMsg(message.channel, `You're welcome, ${member.displayName}!`);
            } catch (err) {
                console.error(err);
                message.channel.send(`Couldn't say thank you to ${member.displayName} because: ${err}`);
            }
        }
        return;
    },
};
