// deno run --allow-net --allow-env --allow-read bot.ts
import 'https://deno.land/x/dotenv/load.ts';
import { app, Intents, type } from '../mod.ts';

const client = app(['~', '^']);

client.prefixes = ['~'];

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

client.listen(Deno.env.get('TOKEN'), [Intents.GUILDS, Intents.GUILD_MESSAGES]);
