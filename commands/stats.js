const Discord = require("discord.js");
const {
    version
} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
exports.run = (client, message, args) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} Stats`, `${client.user.avatarURL}`)
        .setColor(0x00AE86)
        .setFooter("stats")
        .setThumbnail(`${client.user.avatarURL}`)
        .setTimestamp()
        .addField("Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("Uptime", `${duration}`, true)
        .addField("Users", `${client.users.size.toLocaleString()}`, true)
        .addField("Servers", `${client.guilds.size.toLocaleString()}`, true)
        .addField("Channels", `${client.channels.size.toLocaleString()}`, true)
        .addField("Discord.js", `v${version}`, true)
        .addField("Node", `${process.version}`, true);

    if (message.channel.type === "dm") return message.author.send("You can't use this command in DM.");

    message.channel.send({
        embed
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [""]
};

exports.help = {
    name: "stats",
    description: "",
    usage: "stats"
};