import Discord from 'discord.js';
import moment from 'moment';
import _ from 'lodash';

type MessageCallback = (msg: Discord.Message) => void;

type Roles = 'guild officer' | 'guild master' | 'bot' | 'discord admin';

type Options = {
  cooldown?: number;
  roles?: Roles[];
}

export default abstract class Message {
  private cooldowns = new Discord.Collection();

  constructor(
    protected readonly client: Discord.Client,
    protected readonly listen: string,
    protected readonly options: Options = {
      cooldown: 3000,
    },
  ) {}

  protected onMessage = (cb: MessageCallback) => this.client.on('message', (msg) => {
    const content = msg.content
      .toLowerCase()
      .trim();

    if (content === `!${this.listen}`) {
      if (!this.hasRequiredRole(msg)) {
        return;
      }

      if (this.cooldowns.has(this.listen)) {
        return;
      }

      cb(msg);

      this.startCooldown();
    }
  });

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

  private startCooldown = () => {
    const now = moment();

    this.cooldowns.set(this.listen, now);

    setTimeout(() => this.cooldowns.delete(this.listen), this.options.cooldown!);
  }
}
