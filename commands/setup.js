const config = require("../config.json");
exports.run = async(client, message) => {
    if (!message.author.id === config.ownerid) return message.channel.send("You have invalid permissions.");
    const guild = client.guilds.get(config.guildid);
    const staffRole = message.guild.roles.find(role => role.name === "Staff");
    if (!staffRole) {
        guild.createRole({
            name: "Staff",
            color: "RED",
            permissions: ["ADMINISTRATOR"]
        });
        message.channel.send("I have created the Staff Role.");
    } else {
        message.channel.send("Staff Role already exists.");
    }

    let category = await client.channels.find(ch => ch.name === "tickets");
    if (!category) {
        await guild.createChannel("tickets", "category");
        message.channel.send("I have created the Tickets Category");
    } else {
        message.channel.send("Tickets Category already exists.");
    }
    let logsChannel = client.channels.find(ch => ch.name === "logs");
    if (!logsChannel) {
        let defaultRole = guild.defaultRole.id;
        let category = await client.channels.find(ch => ch.name === "tickets");
        await guild.createChannel("logs", "text")
        .then(channel => {
            channel.setParent(category.id);
            channel.overwritePermissions(defaultRole, {
                VIEW_CHANNEL: false
            });
            channel.overwritePermissions(staffRole, {
                VIEW_CHANNEL: true
            });
        });
        message.channel.send("I have created the Text Channel: #logs.");
    } else {
        message.channel.send("Text Channel #logs already exists.");
    }
    return message.channel.send("Setup complete! :grinning:");
};
