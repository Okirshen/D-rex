import { Application } from './src/application.ts';
export * from './src/deps.ts';
export * from './src/types.ts';

export const app = (prefixes: string[]) => {
	return new Application(prefixes);
};
