import Discord from 'discord.js';
import moment from 'moment';

type MessageCallback = (msg: Discord.Message) => void;

export default abstract class Message {
  private cooldowns = new Discord.Collection();

  constructor(
    protected client: Discord.Client,
    protected listen: string,
    protected cooldown = 3000, // eslint-disable-line no-magic-numbers
  ) {}

  protected onMessage = (cb: MessageCallback) => this.client.on('message', (msg) => {
    const content = msg.content
      .toLowerCase()
      .trim();

    if (content === `!${this.listen}`) {
      if (!this.cooldowns.has(this.listen)) {
        cb(msg);
        this.startCooldown();
      }
    }
  });

  private startCooldown = () => {
    const now = moment();

    this.cooldowns.set(this.listen, now);

    setTimeout(() => this.cooldowns.delete(this.listen), this.cooldown);
  }
}
