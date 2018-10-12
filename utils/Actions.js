const Attachment = require('discord.js').Attachment;
const UrlValidator = require('./UrlValidator.js');

const DISCORD_BASE_URL = 'https://discordapp.com';

const YOUTUBE_LINKS = 'youtube-links';
const INSTAGRAM_LINKS = 'instagram-links';
const SPOTIFY_LINKS = 'spotify-links';
const VLIVE_LINKS = 'vlive-links';
const TWITTER_LINKS = 'twitter-links';
const REDDIT_LINKS = 'reddit-links';
const GENERAL_LINKS = 'general-links';
const MEDIA_LINKS = 'media-links';
const MEDIA_ATTACHMENTS = 'media-attachments';

const archiveMedia = (message) => {
    console.log(message);
    const guild = message.guild;
    if (!guild) return;

    maybeSendYoutubeLinks(message);
    maybeSendInstagramLinks(message);
    maybeSendSpotifyLinks(message);
    maybeSendVLiveLinks(message);
    maybeSendTwitterLinks(message);
    maybeSendRedditLinks(message);
    maybeSendGeneralLinks(message);
    maybeSendMediaLinks(message);
    maybeSendAttachments(message);
};

const maybeSendYoutubeLinks = (message) => {
    const embeds = message.embeds;
    if (embeds) {
        embeds.forEach(embed => {
            const match = UrlValidator.matchYTUrl(embed.url);
            if (match) sendToChannel(message, YOUTUBE_LINKS, match[0]);
        });
    }
}

const maybeSendInstagramLinks = (message) => {
    const embeds = message.embeds;
    if (embeds) {
        embeds.forEach(embed => {
            const match = UrlValidator.matchIGUrl(embed.url);
            if (match) sendToChannel(message, INSTAGRAM_LINKS, match[0]);
        });
    }
}

const maybeSendSpotifyLinks = (message) => {
    const embeds = message.embeds;
    if (embeds) {
        embeds.forEach(embed => {
            const match = UrlValidator.matchSpotifyUrl(embed.url);
            if (match) sendToChannel(message, SPOTIFY_LINKS, match[0]);
        });
    }
}

const maybeSendVLiveLinks = (message) => {
    const embeds = message.embeds;
    if (embeds) {
        embeds.forEach(embed => {
            const match = UrlValidator.matchVLiveUrl(embed.url);
            if (match) sendToChannel(message, VLIVE_LINKS, match[0]);
        });
    }
}

const maybeSendTwitterLinks = (message) => {
    const embeds = message.embeds;
    if (embeds) {
        embeds.forEach(embed => {
            const match = UrlValidator.matchTwitterUrl(embed.url);
            if (match) sendToChannel(message, TWITTER_LINKS, match[0]);
        });
    }
}

const maybeSendRedditLinks = (message) => {
    const embeds = message.embeds;
    if (embeds) {
        embeds.forEach(embed => {
            const match = UrlValidator.matchRedditUrl(embed.url);
            if (match) sendToChannel(message, REDDIT_LINKS, match[0]);
        });
    }
}

const maybeSendGeneralLinks = (message) => {
    const embeds = message.embeds;
    if (embeds) {
        embeds.forEach(embed => {
            if (embed.type === 'link') sendToChannel(message, GENERAL_LINKS, embed.url);
        });
    }
}

const maybeSendMediaLinks = (message) => {
    const embeds = message.embeds;
    if (embeds) {
        embeds.forEach(embed => {
            if (embed.type !== 'rich') sendToChannel(message, MEDIA_LINKS, embed.url);
        });
    }
}

const maybeSendAttachments = (message) => {
    const attachments = message.attachments;
    if (attachments) {
        attachments.forEach(attachment => {
            sendToChannel(message, MEDIA_ATTACHMENTS, new Attachment(attachment.url), message.content);
        })
    }
}

const sendToChannel = async (originalMessage, channelName, messageToSend, extraContent) => {
    const guild = originalMessage.guild;
    const originalChannel = originalMessage.channel;
    const channel = guild.channels.find(ch => ch.name === channelName);
    if (channel) {
        await channel.send(`${DISCORD_BASE_URL}/channels/${guild.id}/${originalChannel.id}/${originalMessage.id}`);
        // Hack to tag authors but not ping them.
        const signature = await channel.send('...');
        signature.edit(`${originalMessage.author} shared in ${originalChannel} `);
        if (extraContent) await channel.send(extraContent);
        channel.send(messageToSend);
    }
}

module.exports = {
    archiveMedia,
};
