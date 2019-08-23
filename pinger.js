const Discord = require('discord.js');
const Pinger = new Discord.Client();
Pinger.config = require('./config.js');
config = Pinger.config;

Pinger.on('ready', async () => {
  Pinger.user.setActivity('Iam normal bot :kappa:');
  console.log(`${Pinger.user.username} is online!`);
});

Pinger.on('message', async message => {
  let prefix = config.prefix;
  if(!message.content.startsWith(prefix)) return;

  async function init(){
   console.log(1)
   await sleep(1000)
   console.log(2)
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

  if(config.ownerOnly == true && message.author.id !== config.ownerID) {
    return;
  } else {

  if(message.content.startsWith(prefix+"ping")) {
    let user = message.mentions.users.first();
    if(!user) return message.channel.send(`**${message.author.username}**, you must mention someone!`);

    message.channel.send(`**${message.author.username}**, ping on **${user.tag}** started!`);
    Pinger.user.setActivity(`Pinging: ${user.tag}`);
    console.log(`Started pinging on: ${user.tag}!`)


  interval = setInterval(async () => {

    let pingChannel = Pinger.channels.find(c => c.name === `${config.channelName}`);
    if(!pingChannel) {
      await message.guild.createChannel(`${config.channelName}`).then(c => {
        console.log(`Channel not found. Created new one.\nName: ${c.name}\nID: ${c.id}`);
        c.send(`<@${user.id}>`);
      });
    } else {
      pingChannel.send(`<@${user.id}>`);
    }


  },config.pingInterval);
};

if(message.content.startsWith(prefix+"stop")) {
  await message.channel.send(`**${message.author.username}**, stopping pinging!`);
  await clearInterval(interval);
  await sleep(5000);
  await message.channel.send(`**${message.author.username}**, stopped pinging successfully!`);
  await Pinger.setActivity("Iam normal bot :kappa:")
  console.log(`Stopped pinging by: ${message.author.tag}`);

    }
  }
});

Pinger.login(config.token);
