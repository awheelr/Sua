const config = require("../config.json");
exports.run = (client, message) => {
  if (message.guild.id !== config.guildid) return message.channel.send("This is the wrong guild to be using this command.");

  if (config.supportsystem === "false") return message.channel.send("Support System is not enabled.");

  if (message.channel.type === "dm") return message.author.send("You can't use this command in DM.");
  let staffRole = message.guild.roles.find(role => role.name === "Staff");
  if (!message.member.roles.has(staffRole.id)) return message.channel.send("You have invalid permissions.");
  message.channel.delete();
  let chUser = client.users.get(message.channel.name);
  client.channels.find(ch => ch.name === "logs").send({
    embed: {
      color: 3447003,
      author: {
        name: message.author.username,
        icon_url: message.author.avatarURL
      },
      fields: [{
        name: `Ticket Closed`,
        value: `Name: ${chUser}\nID: ${message.channel.name}`
      }],
      timestamp: new Date(),
      footer: {
        text: `Closed`
      }
    }
  });
  let id = client.users.get(message.channel.name);
  return id.send(`**Your ticket has been closed.** If you need additional help, please message me again.`);
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["c"]
};

exports.help = {
  name: "close",
  description: "Close the ticket",
  usage: "close"
};
