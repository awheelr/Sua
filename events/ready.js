const config = require("../config.json");
const chalk = require("chalk");
module.exports = client => {
    console.log(chalk.green("\nDiscord", `Ready, Logged in as ${client.user.username}`));
    client.user.setStatus(config.botStatus);
    client.user.setPresence({
        game: {
            name: config.botActivityMessage,
            type: config.botActivityType,
            url: config.twithlink
        }
    });
};
