const helpEmbed = require('../embeds/helpEmbed.js');
const Utils = require('../utils/Utils.js');
const { HELP, HELP_SHORT } = require('../assets/flags.json');

const configuration = {
    enabled: true,
    name: 'remove-role',
    aliases: [ 'rm' ],
    description: 'Removes role from self or mentioned users.',
    usage: 'remove-role <ROLE> <MEMBERS>',
};

const removeRole = async (member, message, roleName) => {
    try {
        await member.removeRole(member.guild.roles.find(role => role.name === roleName));
        Utils.logAndMsg(message.channel, `Removed role ${roleName} from ${member.displayName}`);
    } catch (err) {
        console.error(err);
        message.channel.send(`Couldn't remove role ${roleName} from ${member.displayName} because: ${err}`);
    }
};

module.exports = {
    conf: configuration,

    run: async (client, message, args) => {
        const msgSender = message.member;

        if (args[0] === HELP || args[0] === HELP_SHORT || args.length < 1 || !msgSender) {
            helpEmbed(message, configuration);
            Utils.errAndMsg(message.channel, 'Invalid arguments.');
        } else {
            const members = message.mentions.members;
            if (members.size > 0) {
                members.forEach(member => removeRole(member, message, args[0]));
            } else {
                removeRole(msgSender, message, args[0]);
            }
        }
        return;
    },
};
