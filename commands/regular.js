const RichEmbed = require('../messages.js');

module.exports.commands = async (msg, command, args) => {

    if (command == 'me') {
        let nickname = args.join(' ');

        msg.member.setNickname(nickname).then(()=>{
            msg.delete();
            RichEmbed.messages(msg.channel, 'Congrats, your nickname change', '#00A40D');
        }).catch( error => {
            RichEmbed.messages(msg.channel, `An error has occurred: ${error}`, '#FF0018');
        });
    }

    if(command == 'role'){

        let nameRole = args.join(' ');
        let denyRoles = ['Moderator','Administrator','Muted'];

        if(denyRoles.indexOf(nameRole) != -1){
            msg.delete();
            return RichEmbed.messages(msg.channel, 'Sorry, you do not have sufficient permits', '#FF0018');
        }

        let role = msg.guild.roles.find(r => r.name === `${nameRole}`);

        if(!role){
            msg.delete();
            return RichEmbed.messages(msg.channel,'Sorry, there is no role', '#FF0018');
        }

        msg.member.addRole(role.id).then(() => {
            msg.delete();
            RichEmbed.messages(msg.channel, 'Congrats, you have added a new role', '#00A40D');
        }).catch( error => {
            msg.delete();
            RichEmbed.messages(msg.channel, `An error has occurred: ${error}`, '#FF0018');
        });
    }
}

module.exports.help = {
    name: 'regular'
}