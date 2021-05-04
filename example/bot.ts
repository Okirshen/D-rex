// deno run --allow-net --allow-env --allow-read bot.ts
import 'https://deno.land/x/dotenv/load.ts';
// import { app, type } from '../mod.ts';
import { app, type } from 'https://deno.land/x/drex/mod.ts';

// creates client with prefixes ~ and ^
const client = app(['~', '^']);

// changes prefix to ~
client.prefixes = ['~'];

// runs on every message sent
client.hook((message) => {
	message.reply('hello there');
});

// runs every time someone sends ~ping <user> or ^ping <user>
client.command({
	name: 'ping',
	aliases: ['p'],
	params: [
		{
			name: 'user',
			type: type.Member,
		},
	],
	handler: async (msg, args) => {
		msg.reply(
			`pong! ${(await client.member(args.user, msg.guild))?.toString()}`
		);
	},
});

client.listen(Deno.env.get('TOKEN'));
