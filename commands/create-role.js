const helpEmbed = require('../embeds/helpEmbed.js');
const Utils = require('../utils/Utils.js');
const errorPhrases = require('../assets/errorPhrases.json');
const { HELP, HELP_SHORT } = require('../assets/flags.json');

const configuration = {
    enabled: true,
    name: 'create-role',
    aliases: [],
    description: 'Creates a new role globally with a hex color.',
    usage: 'create-role <ROLE> <HEX_COLOR>',
};

module.exports = {
    conf: configuration,

    run: async (client, message, args) => {
        const guild = message.guild;

        if (args[0] === HELP || args[0] === HELP_SHORT || args.length < 2 || !guild) {
            helpEmbed(message, configuration);
            message.channel.send(errorPhrases[Utils.getRandomIndex(errorPhrases)]);
        } else {
            guild.createRole({
                name: args[0],
                color: args[1],
            })
            .then(role => Utils.logAndMsg(message.channel, `Created new role with name ${role.name} and color ${role.color}`))
            .catch(err => Utils.errAndMsg(message.channel, err));
        }
        return;
    },
};
