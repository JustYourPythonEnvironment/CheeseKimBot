const helpEmbed = require('../embeds/helpEmbed.js');
const Utils = require('../utils/Utils.js');
const { HELP, HELP_SHORT } = require('../assets/flags.json');

const configuration = {
    enabled: true,
    name: 'delete-role',
    aliases: [ 'del' ],
    description: 'Deletes a role globally.',
    usage: 'delete-role <ROLE>',
};

module.exports = {
    conf: configuration,

    run: async (client, message, args) => {
        const guild = message.guild;

        if (args[0] === HELP || args[0] === HELP_SHORT || args.length < 1 || !guild) {
            helpEmbed(message, configuration);
            Utils.errAndMsg(message.channel, 'Invalid arguments.');
        } else {
            try {
                let name = args[0];
                if (args.length > 1) {
                    name = args.slice(1).reduce( (str, val) => str + ' ' + val, args[0]);
                }

                const deleted = await guild.roles.find(role => role.name === name).delete();
                Utils.logAndMsg(message.channel, `Deleted role ${deleted.name}`);
            } catch (err) {
                console.error(err);
                message.channel.send(`Couldn't delete role ${args[0]} because: ${err}`);
            }
        }
        return;
    },
};
