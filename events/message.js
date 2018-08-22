const Attachment = require('discord.js').Attachment;
const Utils = require('../utils/Utils.js');
const UrlValidator = require('../utils/UrlValidator.js');
const errorPhrases = require('../assets/errorPhrases.json');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    if (message.content.indexOf(client.config.prefix) !== 0) {
        if (message.content.endsWith('Sana!')) {
            message.channel.send('Shy shy shy!');
        }

        const guild = message.guild;
        if (!guild) return;

        const embeds = message.embeds;
        const attachments = message.attachments;
        if (embeds) {
            embeds.forEach((embed) => {
                const ytMatch = UrlValidator.matchYTUrl(embed.url);
                const igMatch = UrlValidator.matchIGUrl(embed.url);
                const spMatch = UrlValidator.matchSpotifyUrl(embed.url);
                const vlMatch = UrlValidator.matchVLiveUrl(embed.url);
                if (ytMatch) {
                    const ytChannel = guild.channels.find(ch => ch.name === 'youtube-links');
                    if (ytChannel) ytChannel.send(ytMatch[0]);
                } else if (igMatch) {
                    const igChannel = guild.channels.find(ch => ch.name === 'instagram-links');
                    if (igChannel) igChannel.send(igMatch[0]);
                } else if (spMatch) {
                    const spChannel = guild.channels.find(ch => ch.name === 'spotify-links');
                    if (spChannel) spChannel.send(spMatch[0]);
                } else if (vlMatch) {
                    const vliveChannel = guild.channels.find(ch => ch.name === 'vlive-links');
                    if (vliveChannel) vliveChannel.send(vlMatch[0]);
                } else {
                    const mediaChannel = guild.channels.find(ch => ch.name === 'media');
                    if (mediaChannel) mediaChannel.send(embed.url);
                }
            });
        }
        if (attachments) {
            attachments.forEach((attachment) => {
                const mediaChannel = guild.channels.find(ch => ch.name === 'media');
                if (mediaChannel) mediaChannel.send(new Attachment(attachment.url));
            });
        }
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
}