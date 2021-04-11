import type { Command } from './types.ts';
import { type } from './types.ts';
import type { Member } from './deps.ts';

const error = (type: string, name: string) => {
	return { error: `param ${name} received input that is not of type ${type}` };
};

/**
 *
 * @param command - command
 * @param args - args to parse
 * @returns parsed args
 */
export const _parse = (command: Command, args: string[]) => {
	let out: { [key: string]: string | number | { error: string } } = {};
	command.params?.forEach((arg, i) => {
		if (args.length - 2 >= i) {
			switch (arg.type) {
				case type.Number:
					out[arg.name] = types.number(args[i + 1])
						? Number(args[i + 1])
						: error('Number', arg.name);
					break;
				case type.Member:
					out[arg.name] = types.member(args[i + 1])
						? /<@!?(\d+)>/.exec(args[i + 1])![1]
						: error('Member', arg.name);
					break;
				case type.String:
					out[arg.name] = args[i + 1];
					break;
			}
		} else {
			out = { error: `param ${arg.name} is undefined` };
		}
	});
	return out;
};

/**
 * @namespace
 * @property number - checks if input is a number
 * @property member -checks if input is an id or a mention
 */
const types = {
	number: (val: string) => {
		return !isNaN(Number(val));
	},
	member: (val: string) => {
		let id;
		if (val.startsWith('<@')) {
			id = /<@!?(\d+)>/.exec(val)?.[1];
		} else {
			id = val;
		}
		return types.number(id!);
	},
};
