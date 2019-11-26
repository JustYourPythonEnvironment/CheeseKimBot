const Attachment = require('discord.js').Attachment;
const UrlValidator = require('./UrlValidator.js');
const Utils = require('../utils/Utils.js');

const DISCORD_BASE_URL = 'https://discordapp.com';

const YOUTUBE_LINKS = 'youtube-links';
const INSTAGRAM_LINKS = 'instagram-links';
const SPOTIFY_LINKS = 'spotify-links';
const VLIVE_LINKS = 'vlive-links';
const TWITTER_LINKS = 'twitter-links';
const REDDIT_LINKS = 'reddit-links';
const GENERAL_LINKS = 'general-links';
const MEDIA = 'media';

const archiveMedia = (message) => {
    const guild = message.guild;
    if (!guild) return;

    const embeds = message.embeds;
    if (embeds) {
        embeds.forEach(embed => {
            !maybeSendYoutubeLinks(message, embed) &&
            !maybeSendInstagramLinks(message, embed) &&
            !maybeSendSpotifyLinks(message, embed) &&
            !maybeSendVLiveLinks(message, embed) &&
            !maybeSendTwitterLinks(message, embed) &&
            !maybeSendRedditLinks(message, embed) &&
            !maybeSendGeneralLinks(message, embed) &&
            !maybeSendMediaLinks(message, embed);
        });
    }
    maybeSendAttachments(message);
};

const maybeSendYoutubeLinks = (message, embed) => {
    const match = UrlValidator.matchYTUrl(embed.url);
    if (match) {
        sendToChannel(message, YOUTUBE_LINKS, match[0]);
        return true;
    }
    return false;
}

const maybeSendInstagramLinks = (message, embed) => {
    const match = UrlValidator.matchIGUrl(embed.url);
    if (match) {
        sendToChannel(message, INSTAGRAM_LINKS, match[0]);
        return true;
    }
    return false;
}

const maybeSendSpotifyLinks = (message, embed) => {
    const match = UrlValidator.matchSpotifyUrl(embed.url);
    if (match) {
        sendToChannel(message, SPOTIFY_LINKS, match[0]);
        return true;
    }
    return false;
}

const maybeSendVLiveLinks = (message, embed) => {
    const match = UrlValidator.matchVLiveUrl(embed.url);
    if (match) {
        sendToChannel(message, VLIVE_LINKS, match[0]);
        return true;
    }
    return false;
}

const maybeSendTwitterLinks = (message, embed) => {
    const match = UrlValidator.matchTwitterUrl(embed.url);
    if (match) {
        sendToChannel(message, TWITTER_LINKS, match[0]);
        return true;
    }
    return false;
}

const maybeSendRedditLinks = (message, embed) => {
    const match = UrlValidator.matchRedditUrl(embed.url);
    if (match) {
        sendToChannel(message, REDDIT_LINKS, match[0]);
        return true;
    }
    return false;
}

const maybeSendGeneralLinks = (message, embed) => {
    if (embed.type === 'link') {
        sendToChannel(message, GENERAL_LINKS, embed.url);
        return true;
    }
    return false;
}

const maybeSendMediaLinks = (message, embed) => {
    if (embed.type !== 'rich') {
        sendToChannel(message, MEDIA, embed.url);
        return true;
    }
    return false;
}

const maybeSendAttachments = (message) => {
    const attachments = message.attachments;
    if (attachments) {
        attachments.forEach(attachment => {
            sendToChannel(message, MEDIA, new Attachment(attachment.url), message.content);
        })
    }
}

const sendToChannel = async (originalMessage, channelName, messageToSend, extraContent) => {
    const guild = originalMessage.guild;
    const originalChannel = originalMessage.channel;
    const channel = guild.channels.find(ch => ch.name === channelName);
    if (channel) {
        try {
            await Utils.sendBlankLine(channel);
            await channel.send(`${DISCORD_BASE_URL}/channels/${guild.id}/${originalChannel.id}/${originalMessage.id}`);
            await Utils.sendSilentTag(channel, `${originalMessage.author} shared in ${originalChannel} `);
            if (extraContent) await channel.send(extraContent);
            await channel.send(messageToSend);
            await Utils.sendBlankLine(channel);
        } catch (e) {
            console.error('Error while archiving media.', e);
        }
    }
}

module.exports = {
    archiveMedia,
};
