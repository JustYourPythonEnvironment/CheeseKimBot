const Actions = require('../utils/Actions.js');
const Utils = require('../utils/Utils.js');
const errorPhrases = require('../assets/errorPhrases.json');

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) {
        if (message.content.endsWith('Sana!')) {
            message.channel.send('Shy shy shy!');
        }

        Actions.archiveMedia(message);
    } else {
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        console.log(args, command);

        let commandToRun = null;

        if (client.commands.has(command)) {
            commandToRun = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            commandToRun = client.commands.get(client.aliases.get(command));
        }

        if (commandToRun) {
            commandToRun.run(client, message, args);
        } else {
            Utils.errAndMsg(message.channel, 'Invalid command.');
        }
    }
    return;
};