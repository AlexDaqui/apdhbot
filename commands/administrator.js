const RichEmbed = require('../messages.js');

module.exports.commands = async (msg, command, args) => {

    if(command == 'ban'){
        let member = msg.mentions.members.first();

        if(!member){
            return RichEmbed.messages(msg.channel,'Sorry, Member not exists','#FF0018');
        }

        if(!member.bannable){
            return RichEmbed.messages(msg.channel,'Sorry, you do not have sufficient permits', '#FF0018');
        }

        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'Without reason';

        member.ban({reason : reason, days: 7}).then(()=>{
            RichEmbed.messages(msg.channel, `<@!${member.id}> has been banned for the following reason: ${reason}`,'#00A40D');
        }).catch(error => {
            RichEmbed.messages(msg.channel,`An error has occurred: ${error}`, '#FF0018');
        });
    }

    if(command == 'unban'){

        msg.guild.fetchBans().then(bans => {
            let users = bans.filter(r => r.username == args[0]);
            if(!users.first().id){
                return RichEmbed.messages(msg.channel,'The user has not been banned', '#FF0018');
            }
            let reason = args.slice(1).join(' ');
            if(!reason) reason = 'Without reason';

            msg.guild.unban(users.first().id, {reason: reason}).then(() => {
                RichEmbed.messages(msg.channel, `The user ${users.first().username} has been unban for reason: ${reason}`,'#00A40D');
            }).catch(error => {
                RichEmbed.messages(msg.channel,`An error has occurred: ${error}`, '#FF0018');
            });
        });

    }

}

module.exports.help = {
    name: 'administrator'
}