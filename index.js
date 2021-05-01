const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

//call server with TOKEN=tokenGoesHere node index.js

client.login(process.env.TOKEN);
