const fetch = require("node-fetch");
exports.run = async(client, message) => {
    fetch("https://official-joke-api.appspot.com/random_joke")
        .then(res => res.json())
        .then(data => message.channel.send(`${data.setup} ${data.punchline}`))
        .catch(console.error);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["j"]
};

exports.help = {
    name: "joke",
    description: "joke",
    usage: "joke"
};