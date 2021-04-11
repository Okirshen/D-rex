import { Application } from './src/application.ts';
export { Intents } from './src/deps.ts';
export type { Message } from './src/deps.ts';
export type { Command } from './src/types.ts';
export { type } from './src/types.ts';

export let app = (prefixes: string[]) => {
	return new Application(prefixes);
};
