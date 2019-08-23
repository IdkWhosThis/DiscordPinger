# DiscordPinger
Bot for ping spamming someone.

## Installation
All you need to do, is install discord.js using `npm i discord.js`.

## Setup
If you want to use DiscordPinger, you will need to rename `config.js.example` to `config.js`.

Then, open `config.js` and fill it with needed informations.

### config.js:
```js
const config = {

  "prefix": "", //Add your prefix here

  "ownerOnly": true, //If set to true, only bot owner can control Pinger. If set to false, everyone can use Pinger.

  "ownerID": "", //Id of bot owner for "ownerOnly" function.

  "channelName": "", //Name of channel, where will be all pings sent.

  "pingInterval": "1000", //Time in ms (miliseconds). 1000 recommended - If 1000ms (1s), bot will send ping every 1000ms (1s).

  "token": "" //Bot token from discord app.

}

module.exports = config;
```
