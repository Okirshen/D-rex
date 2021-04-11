import type { Message } from './deps.ts';

/**
 * command type
 * @interface
 */
export interface Command {
	name: string;
	aliases?: string[];
	params?: Param[];
	handler: (msg: Message, params: { [key: string]: string }) => void;
}

/**
 * Parameter
 * @interface
 */
export interface Param {
	name: string;
	type: type;
}

/**
 * command type
 * @readonly
 * @enum
 */
export enum type {
	Number = 'NUMBER',
	Member = 'MEMBER',
	String = 'STRING',
}
