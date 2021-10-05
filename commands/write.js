// ping test command
const functions = require(`../othermodules/copybot.js`);

module.exports = {
    name: 'write',
    description: 'Write to database!',
    execute(fs, message, args) {
        functions.writeToFile(fs, message, args);
    },
};