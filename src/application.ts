import { Client, GatewayIntents, Intents } from './deps.ts';
import type { Guild, Message } from './deps.ts';
import type { CustomCommand, Hook } from './types.ts';
import { _parse } from './parser.ts';

/**
 * Client class
 * @classdesc this is the client that gives u the ability to register commands and start the bot
 */
export class Application {
	readonly _commands: CustomCommand[] = [];
	readonly _hooks: Hook[] = [];
	client: Client;

	/**
	 * Registers a hook that runs on every message sent
	 * @param hook - hook function
	 */
	hook(hook: Hook) {
		this._hooks.push(hook);
	}

	/**
	 * Registers command
	 * @param command - command object
	 */
	command(command: CustomCommand) {
		this._commands.push(command);
	}

	/**
	 * Creates the D-rex client
	 * @constructor
	 * @param prefixes - list of prefixes for the bot
	 */
	constructor(public prefixes: string[]) {
		this.client = new Client();
		this.client.on('ready', () => {
			console.log(`Bot Ready! User: ${this.client.user?.tag}`);
		});

		this.client.on('messageCreate', (message: Message): void => {
			if (message.author.id !== this.client.user?.id) {
				console.log(this.client.user?.id);

				for (const hook of this._hooks) {
					hook(message);
				}

				const startsWithPrefix = (prefix: string) =>
					message.content.startsWith(prefix);

				for (const prefix of this.prefixes) {
					if (startsWithPrefix(prefix)) {
						const input: string[] = message.content.split(' ');
						input[0] = input[0].slice(prefix.length);

						const command = this._commands.filter(
							(command) =>
								command.name == input[0] || command.aliases?.includes(input[0])
						)[0];
						if (command) {
							console.log(
								`command ${command.name} ran by ${message.author?.username}`
							);

							let args = {};
							if (command.params) {
								args = _parse(command, input);

								let hasErrors = false;
								for (const [name, arg] of Object.entries(args)) {
									if ((arg as { error: string })?.hasOwnProperty('error')) {
										this.error((arg as { error: string })['error'], message);
										hasErrors = true;
										break;
									} else if (name === 'error') {
										this.error(arg as string, message);
										hasErrors = true;
										break;
									}
								}
								if (!hasErrors) command.handler(message, args);
							} else {
								command.handler(message, {});
							}
						}
						break;
					}
				}
			}
		});
	}

	/**
	 * starts the bot
	 * @param token - discord api token
	 * @param intents - list of intents that the bot can use
	 */
	listen(
		token: string | undefined,
		intents: GatewayIntents[] = Intents.NonPrivileged
	) {
		this.client.connect(token, intents);
	}

	/**
	 * reply's to a message with an error message
	 * @param error - error message
	 * @param message - message to reply to
	 */
	error(error: string, message: Message) {
		message.reply(error);
	}

	/**
	 * @async
	 * @param id - id of the member
	 * @param guild - guild of the member
	 * @returns member - the member with that id at that guild or undefined if the member wasn't found
	 */
	async member(id: string, guild: Guild | undefined) {
		try {
			return await guild?.members.fetch(id);
		} catch {
			return;
		}
	}
}
