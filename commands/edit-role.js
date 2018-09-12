const helpEmbed = require('../embeds/helpEmbed.js');
const Utils = require('../utils/Utils.js');
const { HELP, HELP_SHORT } = require('../assets/flags.json');

const configuration = {
    enabled: true,
    name: 'edit-color',
    aliases: [ 'edit' ],
    description: 'Edits a role color.',
    usage: 'edit-role <ROLE> <HEX_COLOR>',
};

module.exports = {
    conf: configuration,

    run: async (client, message, args) => {
        const guild = message.guild;

        if (args[0] === HELP || args[0] === HELP_SHORT || args.length < 2 || !guild) {
            helpEmbed(message, configuration);
            Utils.errAndMsg(message.channel, 'Invalid arguments.');
        } else {
            try {
                let name = args[0];
                let color = args[1]
                if (args.length > 2) {
                    name = args.slice(1, -1).reduce( (str, val) => str + ' ' + val, args[0]);
                    color = args[args.length - 1]
                }

                const role = guild.roles.find(role => role.name === name);
                await role.setColor(color);
                Utils.logAndMsg(message.channel, `Updated role \`${args[0]}\`'s color to \`${role.color}\``);
            } catch (err) {
                console.error(err);
                message.channel.send(`Couldn't update role \`${args[0]}\`'s color because: ${err}`);
            }
        }
        return;
    },
};
