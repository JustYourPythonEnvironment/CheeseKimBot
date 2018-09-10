const helpEmbed = require('../embeds/helpEmbed.js');
const Utils = require('../utils/Utils.js');
const { HELP, HELP_SHORT } = require('../assets/flags.json');

const configuration = {
    enabled: true,
    name: 'add-role',
    aliases: [ 'add' ],
    description: 'Adds role to self or mentioned users.',
    usage: 'add-role <ROLE> <MEMBERS>',
};

const addRole = async (member, message, roleName) => {
    try {
        await member.addRole(member.guild.roles.find(role => role.name === roleName));
        Utils.logAndMsg(message.channel, `Added role ${roleName} to ${member.displayName}`);
    } catch (err) {
        console.error(err);
        message.channel.send(`Couldn't add role ${roleName} to ${member.displayName} because: ${err}`);
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
                members.forEach(member => addRole(member, message, args[0]));
            } else {
                addRole(msgSender, message, args[0]);
            }
        }
        return;
    },
};
