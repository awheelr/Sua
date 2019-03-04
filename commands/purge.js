const config = require("../config.json");
exports.run = (client, message, args) => {
    let messagecount = parseInt(args.join(" "));
    if (message.channel.type === "dm") return message.author.send("You can't use this command in DM.");

    let staffRole = message.guild.roles.find(role => role.name === "Staff");
    if (!message.member.roles.has(staffRole.id)) return message.channel.send("You have invalid permissions.");

    message.channel.fetchMessages({
        limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));

    message.channel.send("Messages purged.")
        .then(msg => {
            msg.delete();
        });

    if (message.content.startsWith(config.prefix, "purge")) message.delete();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

exports.help = {
    name: "purge",
    description: "Bulk-deletes X amount of messages. Minimum = 2 messages.",
    usage: "purge <number>"
};
