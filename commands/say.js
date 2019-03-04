const config = require("../config.json");
exports.run = (client, message, args) => {
    if (message.channel.type === "dm") return message.author.send("You can't use this command in DM.");

    let staffRole = message.guild.roles.find(role => role.name === "Staff");
    if (!staffRole) return message.channel.send("Staff Role doesn't exist in this guild.")
    if (!message.member.roles.has(staffRole.id)) return message.channel.send("You have invalid permissions.");

    message.channel.send(args.join(" "));
    if (message.content.startsWith(`${config.prefix}say`)) return message.delete().catch(console.error);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["s"]
};

exports.help = {
    name: "say",
    description: "Makes the bot repeat your message.",
    usage: "say [message]"
};
