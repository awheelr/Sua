const fetch = require("node-fetch");
exports.run = async(client, message) => {
    const meta = { "Accept": "text/plain" };

    fetch("https://icanhazdadjoke.com/", { headers: meta })
      .then(res => res.text())
      .then(body => message.channel.send(body));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["dad"]
};

exports.help = {
    name: "dadjoke",
    description: "dad joke",
    usage: "dadjoke"
};
