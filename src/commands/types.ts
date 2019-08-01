import Discord from 'discord.js';

export type MessageCallback = (msg: Discord.Message, args: string[]) => void;

export type Roles = 'guild officer' | 'guild master' | 'bot' | 'discord admin';

export type Options = {
  cooldown: number;
  roles?: Roles[];
}
