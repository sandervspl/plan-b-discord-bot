import path from 'path';
import Discord from 'discord.js';
import Command from '../Command';

export class Grifonta extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'grifonta');

    this.onCommand((msg) => {
      try {
        msg.channel.send('', { files: [path.resolve('static/images/grifonta.png')] });
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
