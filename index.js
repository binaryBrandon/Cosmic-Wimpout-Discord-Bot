const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
dotenv.config();

client.once('ready', () => {
	console.log('Ready!');
});

//.env with TOKEN= exists in directory

client.login(process.env.TOKEN);
//some comment
