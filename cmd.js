const RichEmbed = require('./messages.js');
const regular = require('./commands/regular');
const moderator = require('./commands/moderator');
const administrator = require('./commands/administrator');

module.exports.run = async(msg, command, args) => {

  let allows_commands = {
    'regular' : ['me', 'role'],
    'moderator' : ['warn','kick','clear','mute','unmute'],
    'administrator' : ['ban','unban'],
  };

  if(allows_commands['regular'].indexOf(command) != -1){
    regular.commands(msg, command, args);
  }

  if(allows_commands['moderator'].indexOf(command) != -1){
    if(!msg.member.roles.some(r=>['Administrator', 'Moderator'].includes(r.name))){
      return RichEmbed.messages(msg.channel,'Sorry, you do not have sufficient permits', '#FF0018');
    }
    moderator.commands(msg, command, args);
  }

  if(allows_commands['administrator'].indexOf(command) != -1){
    if(!msg.member.roles.some(r=>['Administrator'].includes(r.name))){
      return RichEmbed.messages(msg.channel,'Sorry, you do not have sufficient permits', '#FF0018');
    }
    administrator.commands(msg, command, args);
  }

}

module.exports.welcome = async (channel, member) => {

  let fields = [
    {"title":"Set Nickname","data":"a!me Nickname","column":false},
    {"title":"Set Role","data":"a!role NameRole","column":false},
  ];

  RichEmbed.messages(channel, `Welcome <@!${member.id}>!!`, '#F0FF00');
  RichEmbed.messages(member, 'Allow commands','#FF0098', fields);
}

module.exports.help = {
  name: 'cmd'
}