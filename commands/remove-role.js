const helpEmbed = require('../embeds/helpEmbed.js');
const Utils = require('../utils/Utils.js');
const { HELP, HELP_SHORT } = require('../assets/flags.json');

const configuration = {
    enabled: true,
    name: 'remove-role',
    aliases: [ 'rm' ],
    description: 'Removes role from self.',
    usage: 'remove-role <ROLE>',
};

module.exports = {
    conf: configuration,

    run: async (client, message, args) => {
        const member = message.member;

        if (args[0] === HELP || args[0] === HELP_SHORT || args.length < 1 || !member) {
            helpEmbed(message, configuration);
            Utils.errAndMsg(message.channel, 'Invalid arguments.');
        } else {
            try {
                await member.removeRole(member.guild.roles.find(role => role.name === args[0]));
                Utils.logAndMsg(message.channel, `Removed role ${args[0]} from ${member.displayName}`);
            } catch (err) {
                console.error(err);
                message.channel.send(`Couldn't remove role ${args[0]} from ${member.displayName} because: ${err}`);
            }
        }
        return;
    },
};
