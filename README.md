# D-rex

d-rex is a simple deno discord framework that lets u register commands. d-rex is based on the [harmony discord library](https://deno.land/x/harmony) and built with deno and ts.

## example

```ts
// deno run --allow-net --allow-env --allow-read bot.ts
import 'https://deno.land/x/dotenv/load.ts';
import { app, Intents, type } from 'https://deno.land/x/drex/mod.ts';

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
```

## contact

[dev@okirshen.xyz](mailto:dev@okirshen.xyz)

or discord with _joerje#5185_
