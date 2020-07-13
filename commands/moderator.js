const RichEmbed = require('../messages.js');

module.exports.commands = async (msg, command, args) => {

    if(command == 'kick'){
        let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);

        if(!member){
            msg.delete();
            return RichEmbed.messages(msg.channel,'Sorry, Member not exists','#FF0018');
        }

        if(!member.kickable) {
            msg.delete();
            return RichEmbed.messages(msg.channel,'Sorry, you do not have sufficient permits', '#FF0018');
        }

        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'Without reason';

        member.kick(reason).then(()=>{
            msg.delete();
            RichEmbed.messages(msg.channel, `<@!${member.id}> has been expelled for the following reason: ${reason}`,'#00A40D');
        }).catch(error => {
            msg.delete();
            RichEmbed.messages(msg.channel,`An error has occurred: ${error}`, '#FF0018');
        });
    }

    if(command == 'warn'){
        let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);

        if(!member){
            msg.delete();
            return RichEmbed.messages(msg.channel,'Sorry, Member not exists','#FF0018');
        }

        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'You must behave or you will be expelled from the server';

        msg.delete();
        RichEmbed.messages(msg.channel, `<@!${member.id}> ${reason}`,'#00A40D');
    }

    if(command == 'clear'){
        msg.channel.bulkDelete(args[0]).then(()=>{
            msg.delete();
            RichEmbed.messages(msg.channel,`Cleared ${args[0]} messages`, '#00A40D');
        }).catch(error => {
            msg.delete();
            RichEmbed.messages(msg.channel,`An error has occurred: ${error}`, '#FF0018');
        });
    }

    if(command == "mute"){
        let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);

        if(!member){
            msg.delete();
            return RichEmbed.messages(msg.channel,'Sorry, Member not exists','#FF0018');
        }

        let muteRole = msg.guild.roles.find(r => r.name === 'Muted');
        if(!muteRole){
            muteRole = await msg.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            });
            msg.guild.channels.forEach(async (channel,id ) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                }).then(updated => console.log(updated.permissionOverwrites.get(muteRole.id)))
                .catch(console.error);
            });
        }

        let muteTime = args[1];

        member.addRole(muteRole.id).then(()=>{
            if(!muteTime) {
                msg.delete();
                RichEmbed.messages(msg.channel,`<@!${member.id}> has been muted forever`, '#00A40D');
            } else {
                msg.delete();
                muteTime = muteTime * 60000;
                RichEmbed.messages(msg.channel,`<@!${member.id}> has been muted for ${args[1]} min`, '#00A40D');

                setTimeout(function(){
                    member.removeRole(muteRole.id).then(()=>{
                        RichEmbed.messages(msg.channel,`<@!${member.id}> has been unmuted`, '#00A40D');
                    }).catch(error => {
                        msg.delete();
                        RichEmbed.messages(msg.channel,`An error has occurred: ${error}`, '#FF0018');
                    });
                }, muteTime);
            }
        }).catch(error => {
            msg.delete();
            RichEmbed.messages(msg.channel,`An error has occurred: ${error}`, '#FF0018');
        });
    }

    if(command == "unmute"){
        let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);

        if(!member){
            msg.delete();
            return RichEmbed.messages(msg.channel,'Sorry, Member not exists','#FF0018');
        }

        let muteRole = msg.guild.roles.find(r => r.name === 'Muted');
        if(!muteRole){
            msg.delete();
            return RichEmbed.messages(msg.channel,'Sorry, there is no role', '#FF0018');
        }

        member.removeRole(muteRole.id).then(()=>{
            msg.delete();
            RichEmbed.messages(msg.channel,`<@!${member.id}> has been unmuted`, '#00A40D');
        }).catch(error => {
            msg.delete();
            RichEmbed.messages(msg.channel,`An error has occurred: ${error}`, '#FF0018');
        });
    }
}

module.exports.help = {
    name: 'moderator'
}