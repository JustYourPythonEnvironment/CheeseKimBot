# CheeseKimBot
A media archiver Discord bot that archives various types of media into their respective channels.
![image](https://user-images.githubusercontent.com/5790854/44437127-96436500-a586-11e8-8a8b-03d8c148cb67.png)

# Setup

1. Create a `.env` file in the root directory.
2. Add `NODE_ENV=developer`
3. Ask for the Discord token and add `DISCORD_TOKEN=<token>` in the `.env` file.
4. Make sure you have node v10+.
5. `npm install`
6. `npm start` or alternatively, install nodemon and run `nodemon bot.js` to run the bot and watch for changes.
7. Commands for this bot will be executed with the prefix and `-dev` appended to it (ex. `kimbap-dev thanks`).
