const helpEmbed = require('../embeds/helpEmbed.js');
const Utils = require('../utils/Utils.js');
const errorPhrases = require('../assets/errorPhrases.json');
const { HELP, HELP_SHORT } = require('../assets/flags.json');

const configuration = {
    enabled: true,
    name: 'delete-role',
    aliases: [],
    description: 'Deletes a role globally.',
    usage: 'delete-role <ROLE>',
};

module.exports = {
    conf: configuration,

    run: async (client, message, args) => {
        const guild = message.guild;

        if (args[0] === HELP || args[0] === HELP_SHORT || args.length < 1 || !guild) {
            helpEmbed(message, configuration);
            message.channel.send(errorPhrases[Utils.getRandomIndex(errorPhrases)]);
        } else {
            guild.roles.find(role => role.name === args[0]).delete()
                .then(deleted => Utils.logAndMsg(message.channel, `Deleted role ${deleted.name}`))
                .catch(err => Utils.errAndMsg(message.channel, err));
        }
        return;
    },
};
