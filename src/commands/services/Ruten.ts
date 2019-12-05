import path from 'path';
import Discord from 'discord.js';
import Command from '../Command';

export class Ruten extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'ruten');

    this.onCommand((msg) => {
      // Random img
      const num = 1 + Math.round(Math.random() * 1);

      try {
        msg.channel.send('', { files: [path.resolve(`static/images/ruten${num}.jpg`)] });
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
