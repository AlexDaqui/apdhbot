const {RichEmbed} = require('discord.js');

module.exports.messages = async(channel , description, color, fields = null) => {

    const embed = new RichEmbed()
    .setDescription(description)
    .setColor(color);

    if(fields != null){
      for(i in fields){
        embed.addField(fields[i].title, fields[i].data, fields[i].column);
      }
    }

    channel.send(embed);
}

module.exports.help = {
  name: 'messages'
}