const UrlValidator = require('../utils/UrlValidator.js');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    if (message.content.indexOf(client.config.prefix) !== 0) {
        if (message.content.endsWith('Sana!')) {
            message.channel.send('Shy shy shy!');
        }

        const ytMatch = UrlValidator.matchYTUrl(message.content);
        const igMatch = UrlValidator.matchIGUrl(message.content);
        const spMatch = UrlValidator.matchSpotifyUrl(message.content);
        const vlMatch = UrlValidator.matchVLiveUrl(message.content);

        if (ytMatch) {
            const ytChannel = client.channels.find(ch => ch.name === 'youtube-links');
            if (ytChannel) ytChannel.send(ytMatch[0]);
            return;
        }
        if (igMatch) {
            const igChannel = client.channels.find(ch => ch.name === 'instagram-links');
            if (igChannel) igChannel.send(igMatch[0]);
            return;
        }
        if (spMatch) {
            const spChannel = client.channels.find(ch => ch.name === 'spotify-links');
            if (spChannel) spChannel.send(spMatch[0]);
            return;
        }
        if (vlMatch) {
            const vliveChannel = client.channels.find(ch => ch.name === 'vlive-links');
            if (vliveChannel) vliveChannel.send(vlMatch[0]);
            return;
        }

        
    } else {
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        console.log(args, command)

        let commandToRun = null;

        if (client.commands.has(command)) {
            commandToRun = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            commandToRun = client.commands.get(client.aliases.get(command));
        }

        if (commandToRun) {
            commandToRun.run(client, message, args);
        } else {
            // do nothing
        }
    }
    return;
}