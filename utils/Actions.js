const Attachment = require('discord.js').Attachment;
const UrlValidator = require('./UrlValidator.js');

archiveMedia = (message) => {
    console.log(message);
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
            const twitterMatch = UrlValidator.matchTwitterUrl(embed.url);
            const redditMatch = UrlValidator.matchRedditUrl(embed.url);

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
            } else if (twitterMatch) {
                const twitterChannel = guild.channels.find(ch => ch.name === 'twitter-links');
                if (twitterChannel) twitterChannel.send(twitterMatch[0]);
            } else if (redditMatch) {
                const redditChannel = guild.channels.find(ch => ch.name === 'reddit-links');
                if (redditChannel) redditChannel.send(redditMatch[0]);
            } else if (embed.type === 'link') {
                const linkChannel = guild.channels.find(ch => ch.name === 'general-links');
                if (linkChannel) linkChannel.send(embed.url);
            } else if (embed.type !== 'rich') {
                const mediaChannel = guild.channels.find(ch => ch.name === 'media');
                if (mediaChannel) mediaChannel.send(embed.url);
            }
        });
    }
    if (attachments) {
        attachments.forEach((attachment) => {
            const mediaChannel = guild.channels.find(ch => ch.name === 'attachments');
            if (mediaChannel) mediaChannel.send(new Attachment(attachment.url));
        });
    }
};

module.exports = {
    archiveMedia,
};
