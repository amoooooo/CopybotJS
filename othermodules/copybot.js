// copybot.js functions
const Discord = require('discord.js');
const client = new Discord.Client();
const copybot = this;
module.exports = {
    // generates a random number multiplied by the argument
    genNum: function (chance) {
        return Math.floor(Math.random() * chance);
    },
    // calculates chance. Math.floor(Math.random() * 100) returns a random number under 100, if randonumber is less than the chance, then it has gotten lucky
    chanceCalc: function (chance) {
        let randonumber = Math.floor(Math.random() * 100);
        if (randonumber < chance) {
            return 1;
        } else {
            return 0;
        }
    },
    // checks if str is a url or not
    checkURL: function (str) {
        let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    },
    // writes the msgContent to the array.txt file
    writeToFile: function (fs, message, msgContent) {
        let contentNoPrefix = msgContent.slice(6);
        fs.appendFile('array.txt', contentNoPrefix + "\n", (err) => {
            if (err) throw err;
        });
        console.log("written " + contentNoPrefix + " to array.txt");
        return message.channel.send("written **" + contentNoPrefix + "** to the database");
    },
    // mimics someone via name, avatar and color role
    copyPerson: async function (message, client, userID, sentMessage, chance) {
        let randnum = module.exports.chanceCalc(chance);
        if (randnum === 1) {
            console.log('test');
            //await message.guild.me.roles.add("706674098985500762").then(async r => {
                await message.guild.me.roles.remove(message.guild.me.roles.color)
                    .catch(error => {})
                    .then(async r => {
                        await message.guild.me.setNickname(message.member.displayName);
                        try {
                            client.user.setAvatar(message.author.displayAvatarURL()).catch(error => {
                            });
                            const role = message.guild.me.roles.cache.find(role => role.id === '851199244576489497')
                            await role.setColor(message.member.displayHexColor)
                            setTimeout(function () {
                                if (module.exports.checkURL(sentMessage)) {
                                    let imgEmbed = new Discord.MessageEmbed()
                                        .setColor("RANDOM")
                                        .setTitle("image")
                                        .setImage(sentMessage);
                                    message.channel.send(imgEmbed);
                                } else {
                                    return message.channel.send(sentMessage);
                                }
                            }, 500);
                        } catch (error) {
                            console.log(error);
                        }
                    });
            //});

        }

    }
}