//config file JSON object, contains {"prefix": "chosenprefix"}
const {
  prefix
} = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

//needed to read .env file with discord API token
const dotenv = require('dotenv');
dotenv.config();

client.once('ready', () => {
  console.log('Ready!');
});

//.env with TOKEN= exists in directory
client.login(process.env.TOKEN);

//console.log(`${prefix}ping`);

var players = [];
var started = false;
var roll = [];
var pointsThisRoll;
var testArray = [];
var pointTarget;

client.on('message', message => {
  //console.log(typeof message);
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  //this code is well and good and I'm sure I'll reference it, but it's not what I want this bot to do
  // if (message.content.startsWith(`${prefix}ping`)) {
  //   message.channel.send('Pong!');
  // } else if (message.content.startsWith(`${prefix}beep`)) {
  //   message.channel.send('Boop');
  // } else if (message.content === `${prefix}server`) {
  //   message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  // } else if (message.content === `${prefix}userinfo`) {
  //   message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  // } else if (command === 'argsinfo') {
  // 	if (!args.length) {
  // 		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  // 	} else if (args[0] === 'foo') {
  // 		message.channel.send('bar');
  // 	}
  // 	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
  // }

  //myFunc(message);
  if (command === 'newgame' && started === false) {
    //console.log(args);
    if (!args.length) {
      message.channel.send("You must specify a target point value! Example: !newgame 300 will start a game to 300 points.");
      return;
    }
    newGame(message, args[0]);
  } else if (command === 'join' && !players.includes(message.author.username)) {
    players.push(message.author.username);
    message.channel.send(`Current player list: ${players}`);
  } else if (command === 'print') {
    console.log(args[0])
  } else if (started === true && command === 'roll') {
    rollDice(message);
  }

});


function myFunc(message) {
  console.log("we made it");
  message.channel.send(`This is a test`);
}

function newGame(message, pointGoal) {
  players = [];
  started = true;
  pointTarget = pointGoal;
  players.push(message.author.username);
  message.channel.send(`Starting new game to ${pointGoal}. Type !join to play!\nCurrent players: ${players}`);
  //do logic to let people opt-in to game
  //started = false;
}

function rollDice(message) {
  roll = [];
  pointsThisRoll = 0;
  for (i = 0; i < 5; i++) {
    roll[i] = (Math.floor(Math.random() * 6) + 1);
    if (i < 4) { //display images for the white cubes
      message.channel.send({
          files: [{
            attachment: 'img/w' + roll[i] + '.png',
            name: 'file.jpg'
          }]
        })
        .then(console.log)
        .catch(console.error);
      //message.channel.send(`${roll}`);

    } else if (i === 4) { //display images for the black cube
      //3 is wild
      message.channel.send({
          files: [{
            attachment: 'img/b' + roll[i] + '.png',
            name: 'file.jpg'
          }]
        })
        .then(console.log)
        .catch(console.error);
    }
  } //end for loop

  roll.sort();

  for (i = 1; i < 5; i++) {
    testArray = roll.filter(function({
      roll[i] == roll[i - 1];
    }));
    if (roll[0] === roll[1] && roll[0] === roll[2] && roll[0] === roll[3] && roll[0] === roll[4] && roll[4] !== 3) {
      //freight train
      //if roll[4] !== 3, it's not wild and the freight train is forced
      //no additional logic required

      switch (roll[0]) { //switch on first value to determine how many points
        case 1:
          //supernova

          //this logic unneccessary due to if statement above          // if (roll[4] === 3) {
          //   break; //if the sun cube was wild, make it something other than a 10 to avoid supernova
          // } else {

          //end game
          started = false;
          pointTarget = null;
          message.channel.send(`Supernova! ${message.author.username} loses!`);
          break;
          // }
        case 2:
          //+200 pts
          message.channel.send(`200 points!`)
          pointsThisRoll += 200;
          break;
        case 3:
          //+300 pts
          message.channel.send(`300 points!`)
          pointsThisRoll += 300;
          break;
        case 4:
          //+400 pts
          message.channel.send(`400 points!`)
          pointsThisRoll += 400;
          break;
        case 5:
          //+500 pts
          message.channel.send(`500 points!`)
          pointsThisRoll += 500;
          break;
        case 6:
          //instant win
          started = false;
          pointTarget = null;
          message.channel.send(`Instant win for ${message.author.username}!`);
          break;
        default:
          message.channel.send(`Something went wrong. Freight Train. ${roll}.`);
      }
    } else if (roll[0] === roll[2] || roll[1] === roll[3]] || roll[2] === roll[4]) {
    //flash (3 of a kind)
    //switch to determine point value
    switch (roll[0]) {
      case 1:
        message.channel.send(`100 point flash!`);
        pointsThisRoll += 100;
        break;
      case 2:
        message.channel.send(`20 point flash!`);
        pointsThisRoll += 20;
        break;
      case 3:
        message.channel.send(`30 point flash!`);
        pointsThisRoll += 30;
        break;
      case 4:
        message.channel.send(`40 point flash!`);
        pointsThisRoll += 40;
        break;
      case 5:
        message.channel.send(`50 point flash!`);
        pointsThisRoll += 50;
        break;
      case 6:
        message.channel.send(`60 point flash!`);
        pointsThisRoll += 60;
        break;
      default:
        message.channel.send(`Something went wrong. Flash. ${roll}.`)
    }
  }
  //else if ((roll[0] === roll[1] && roll[0] === roll[2]) ||
  // (roll[0] === roll[1] && roll[0] === roll[3]) ||
  // (roll[0] === roll[1] && roll[0] === roll[4]) ||
  // (roll[0] === roll[2] && roll[0] === roll[3]) ||
  // (roll[0] === roll[2] && roll[0] === roll[4]) ||
  // (roll[0] === roll[3] && roll[0] === roll[4]) ||
  // (roll[1] === roll[2] && roll[1] === roll[3]) ||
  // (roll[1] === roll[2] && roll[1] === roll[4]) ||
  // (roll[1] === roll[3] && roll[1] === roll[4]) ||
  // (roll[2] === roll[3] && roll[2] === roll[4])  )
  //there has to be a better algorithm for this - maybe sorting the array and comparing?
  //}

}
