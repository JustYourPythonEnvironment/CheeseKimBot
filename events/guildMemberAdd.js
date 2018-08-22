module.exports = async (client, member) => {
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`Annyeonghaseyo ${member}!`);
}