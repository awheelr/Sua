const config = require("../config.json");
exports.run = (client, message) => {
  var name = message.author.username;
  let args = message.content.split(/ +/g).slice(1);
  if (args.length < 1) return message.channel.send("Incorrect command usage!");
  let id = args[0];
  let text = args.slice(0).join(" ");

  if (message.guild.id !== config.guildid) return message.channel.send("This is the wrong guild to be using this command.");

  if (config.supportsystem === "false") return message.channel.send("Support System is not enabled.");

  if (message.channel.type === "dm") return message.author.send("You can't use this command in DM.");

  let staffRole = message.guild.roles.find(role => role.name === "Staff");
  if (!message.member.roles.has(staffRole.id)) return message.channel.send("You have invalid permissions.");

  if (client.users.get(message.channel.name).send(`**${name}**: ${text}`)) {
    return message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL
        },
        fields: [{
          name: `Your message has been sent!`,
          value: `**${name}**: ${text}`
        }],
        timestamp: new Date(),
        footer: {
          text: "Reply"
        }
      }
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["r"]
};

exports.help = {
  name: "reply",
  description: "Reply to ticket",
  usage: "reply"
};
