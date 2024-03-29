const Discord = require('discord.js');
const predb = require('quick.db')
const bconfig = require('../../config.json')

module.exports = {
    name: 'setup',
    cooldown: 10,
    async execute(message, args, client) {

        // user-perm
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('Make Sure You Have **MANAGE_SERVER** permission to use this command .')

        // bot-perm
        if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embedargs = new Discord.MessageEmbed()
        embedargs.setDescription(`• Please Use **.setup** command like : **${bconfig.defaultprefix}setup serverip serverport**`)
        embedargs.setColor('RED')
        embedargs.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embedargs.setTimestamp()

        if (!args[1]) return message.channel.send({ embeds: [embedargs] })
        if (!args[2]) return message.channel.send({ embeds: [embedargs] })

        let embedportnum = new Discord.MessageEmbed()
        embedportnum.setDescription(`• Make Sure That The **PORT** you are entering is numeric`)
        embedportnum.setColor('RED')
        embedportnum.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embedportnum.setTimestamp()

        if (isNaN(parseInt(args[2]))) return message.channel.send({ embeds: [embedportnum] })

        let embedportlength = new Discord.MessageEmbed()
        embedportlength.setDescription(`• Make Sure That The **PORT** you are entering is not more than 5 numbers`)
        embedportlength.setColor('RED')
        embedportlength.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embedportlength.setTimestamp()

        if (args[2].length > 5) return message.channel.send({ embeds: [embedportlength] })

        let embedsameip = new Discord.MessageEmbed()
        embedsameip.setDescription(`• Looks Like You Server Has Already An IP , For View It Use **${bconfig.defaultprefix}ip** , For Reset Use **${bconfig.defaultprefix}reset**`)
        embedsameip.setColor('YELLOW')
        embedsameip.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embedsameip.setTimestamp()

        if (predb.has(`guild_${message.guild.id}_ip`)) return message.channel.send({ embeds: [embedsameip] })

        await predb.set(`guild_${message.guild.id}_ip`, args[1])
        await predb.set(`guild_${message.guild.id}_port`, args[2])

        let embedSetup = new Discord.MessageEmbed();
        embedSetup.setTitle(client.user.username)
        embedSetup.setURL(bconfig.websitelink)
        embedSetup.setDescription("Setup Panel Here :-")
        embedSetup.addFields([
            {
                "name": "IP",
                "value": "```" + `${args[1]}` + "```"
            },
            {
                "name": "PORT",
                "value": "```" + `${args[2]}` + "```"
            }
        ])
        embedSetup.setColor("GREEN");
        embedSetup.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedSetup.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        embedSetup.setTimestamp();
        return message.channel.send({ embeds: [embedSetup] });
    }
}