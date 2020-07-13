const {Client} = require('discord.js');
const client = new Client();
const cmd = require('./cmd.js');

const config = require('./util/config.json');


client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', msg => {
  if(msg.content.indexOf(config.prefix) !== 0) return;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  cmd.run(msg, command, args);
});


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === config.channel);
  if (!channel) return;
  cmd.welcome(channel, member);
});

client.login(config.token);