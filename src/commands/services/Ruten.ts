import path from 'path';
import Discord from 'discord.js';
import Command from '../Command';

export class Ruten extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'ruten');

    this.onCommand((msg) => {
      try {
        msg.channel.send('', { files: [path.resolve('static/images/ruten.jpg')] });
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
