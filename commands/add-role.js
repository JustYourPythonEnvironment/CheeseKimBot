const helpEmbed = require('../embeds/helpEmbed.js');
const Utils = require('../utils/Utils.js');
const { HELP, HELP_SHORT } = require('../assets/flags.json');

const configuration = {
    enabled: true,
    name: 'add-role',
    aliases: [],
    description: 'Adds role to self.',
    usage: 'add-role <ROLE>',
};

module.exports = {
    conf: configuration,

    run: async (client, message, args) => {
        const member = message.member;

        if (args[0] === HELP || args[0] === HELP_SHORT || args.length < 1 || !member) {
            helpEmbed(message, configuration);
            Utils.errAndMsg(message.channel, 'Invalid arguments.');
        } else {
            member.addRole(member.guild.roles.find(role => role.name === args[0]))
                .then(member => Utils.logAndMsg(message.channel, `Added role ${args[0]} to ${member.displayName}`))
                .catch(err => Utils.errAndMsg(message.channel, err));
        }
        return;
    },
};
