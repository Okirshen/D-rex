# D-rex

D-rex is a discord framework built on the [harmony framework](https://deno.land/x/harmony/mod.ts)
with ease of use and simplisity in mind

## Usage/Examples

```typescript
// deno run --allow-net --allow-env --allow-read bot.ts
import 'https://deno.land/x/dotenv/load.ts';
// import { app, type } from '../mod.ts';
import { app, type } from 'https://deno.land/x/drex/mod.ts';

// creates client with prefixes ~ and ^
const client = app(['~', '^']);

// changes prefix to ~
client.prefixes = ['~'];

// runs on every message sent
client.hook(message => {
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
```

## API Reference

#### Returns Client object

```typescript
app(prefixes);
```

| Parameter  | Type       | Description                                |
| :--------- | :--------- | :----------------------------------------- |
| `prefixes` | `string[]` | **Required**. List of prefixes for the bot |

#### Registers command

```typescript
  client.command({name, [aliases], [params], handler})
```

| Parameter | Type       | Description                                        |
| :-------- | :--------- | :------------------------------------------------- |
| `name`    | `string`   | **Required**. Name of the commad                   |
| `handler` | `func`     | **Required**. Function to run on command activated |
| `aliases` | `string[]` | List of aliases for the command                    |
| `params`  | `Param[]`  | List of param objects to require                   |

#### Registers hook

runs on every command

```typescript
client.hook(hook);
```

| Parameter | Type   | Description                                                    |
| :-------- | :----- | :------------------------------------------------------------- |
| `hook`    | `func` | **Required**. Function that gets the message object being sent |

#### Runs client

runs on every command

```typescript
client.listen(apiToken);
```

| Parameter  | Type     | Description             |
| :--------- | :------- | :---------------------- |
| `apiToken` | `string` | **Required**. Api token |

## Documentation

[Full Documentation](https://doc.deno.land/https/deno.land%2Fx%2Fdrex%2Fmod.ts)

## Authors

- [@okirshen](https://www.github.com/Okirshen)
- [@integral](https://github.com/HARDIntegral)
  [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Roadmap

- [ ] Decorators support
- [ ] class based clients
- [ ] Porting to a custom client libary
- [ ] Building a support discord server

## Support

For support, email okirshen@gmail.com.
