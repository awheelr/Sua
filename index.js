const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const chalk = require("chalk");
require("dotenv").config();
client.config = config;


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      console.log(chalk.blue(`Loaded event ${eventName}`));
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
    return console.log(chalk.green("Events Loaded!\n"));
  });

client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(chalk.blue(`Loaded command ${commandName}`));
      client.commands.set(commandName, props);
    });
    return console.log(chalk.green("Commands Loaded!"));
  });

client.on("message", async message => {
    var guild = client.guilds.get(config.guildid);
    var userid = message.author.id;

    if (config.supportsystem === "false") return;

    if (message.channel.type === "dm") {
        if (message.content.startsWith(config.prefix)) return;
        if (message.author.id === config.botid) return;

        let channel = guild.channels.find(channel => channel.name === userid);
        if (channel) {
            channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    fields: [{
                        name: `${message.author.id}`,
                        value: `${message.content}`
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: "Ticket"
                    }
                }
            });
        } else {
            let category = client.channels.find(ch => ch.name === "tickets");
            let defaultRole = guild.defaultRole.id;
            let staffRole = guild.roles.find(role => role.name === "Staff");
            guild
                .createChannel(userid)
                .then(channel => channel.setParent(category))
                .then(channel =>
                    channel.send({
                        embed: {
                            color: 3447003,
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            fields: [{
                                name: `${message.author.id}`,
                                value: `${message.content}`
                            }],
                            timestamp: new Date(),
                            footer: {
                                text: "Ticket"
                            }
                        }
                    })
                )
                .then(me => {
                    me.channel.overwritePermissions(defaultRole, {
                        VIEW_CHANNEL: false
                    });

                    me.channel.overwritePermissions(staffRole, {
                        VIEW_CHANNEL: true
                    });
                });
            message.author.send(`**Message sent!** Your ticket has been created!`);
        }
    }
});


client.on("warn", err => client.logger.error(err));

client.on("warn", warn => client.logger.warn(warn));

process.on("uncaughtException", (err) => {
  console.log(err);
});
process.on("unhandledRejection", (err) => {
  console.log(err);
});

// eslint-disable-next-line no-process-env
client.login(config.token);
