const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");

client.on("ready", () => client.user.setActivity("I'm a normal bot :kappa:", { type: "PLAYING" }));
client.on("messageCreate", async (msg) => {
	const sleep = (ms) => { return new Promise((res) => setTimeout(res, ms)) }
	const prefix = config.prefix;
	const cmds = ["ping", "stop"];
	const hasCommand = (v) => msg.content.startsWith(prefix+cmds[v]);
	
	if (msg.author.bot) return;
	if ((config.ownerOnly == true) && (msg.author.id !== config.ownerID)) return; else {
		if (hasCommand(0)) {
			let user = msg.mentions.users.first();
			let chan = client.channels.find((c) => (c.name === config.channelName));
			if (!user) return msg.reply(`[ERR]: No user was mentioned.`);
			
			client.user.setActivity(`Pinging: ${user.tag}`);
			console.log(`Pinging: ${user.tag}`);
			msg.reply(`Begain pinging: ***${user.tag}*`);
			
			let interval = setInterval(async () => {
				if (!chan) {
					await msg.guild.createChannel(config.channelName).then((n) => {
						console.log(`[ERR]: Failed to find channel, so a new one was created.\nName: ${n.name}\nID: ${n.id}`);
						n.send(`<@${user.id}>`);
					});
				} else ((config.channelName).send(`<@${user.id}>`));
			}, config.pingInterval);
		} else {
			if (hasCommand(1)) {
				await msg.reply();
				await clearInterval(interval);
				await sleep(5000);
				await msg.reply(`I've stopped pinging ${user.tag}`);
				await client.user.setActivity("I'm a normal bot :kappa:", { type: "PLAYING" });
			}
		}
	}
});

Pinger.login(config.token);
