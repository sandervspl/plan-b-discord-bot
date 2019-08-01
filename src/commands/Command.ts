import Discord from 'discord.js';
import moment from 'moment';
import _ from 'lodash';
import env from 'helpers/env';
import { Options, CommandCallback } from './types';

export default abstract class Command {
  private cooldowns = new Discord.Collection();
  private readonly options: Options = {
    cooldown: 3000,
  };

  constructor(
    protected readonly client: Discord.Client,
    protected readonly listen: string,
    options: Options,
  ) {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  protected onCommand = (cb: CommandCallback) => this.client.on('message', (msg) => {
    if (env.isDevelopment && !this.isFromDeveloper(msg)) {
      return;
    }

    // Clean up message
    const content = msg.content
      .toLowerCase()
      .trim();

    // Check if message starts with the command prefix
    if (!msg.content.startsWith('!')) {
      return;
    }

    // Remove prefix
    const message = content.slice(1);

    // Check if the message we received is the same as what we listen to
    if (message.startsWith(this.listen)) {
      if (!this.hasRequiredRole(msg)) {
        return;
      }

      if (this.cooldowns.has(this.listen)) {
        return;
      }

      cb(msg, this.getArgs(msg.content));

      this.startCooldown();
    }
  });

  protected isFromDeveloper = (msg: Discord.Message): boolean => {
    return msg.author.id === '77783102469967872';
  }

  protected getArgs = (content: string): string[] => {
    return content.split(' ').slice(1);
  }


  private hasRequiredRole = (msg: Discord.Message): boolean => {
    if (this.options.roles) {
      const member = msg.guild.members.find((member) => member.id === msg.author.id);

      if (!member) {
        return false;
      }

      const memberRoles = member.roles.map((role) => role.name.toLowerCase());
      const hasRequiredRole = _.intersection(this.options.roles, memberRoles).length > 0;

      return hasRequiredRole;
    }

    return true;
  }

  private startCooldown = (): void => {
    const now = moment();

    this.cooldowns.set(this.listen, now);

    setTimeout(() => this.cooldowns.delete(this.listen), this.options.cooldown);
  }
}
