import type { Message } from './deps.ts';

/**
 * command type
 * @interface
 */
export interface CustomCommand {
	name: string;
	aliases?: string[];
	params?: Param[];
	handler: (message: Message, params: { [key: string]: string }) => void;
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

export type Hook = (message: Message) => void;
