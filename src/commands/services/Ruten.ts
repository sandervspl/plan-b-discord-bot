import path from 'path';
import Discord from 'discord.js';
import Command from '../Command';

export class Ruten extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'ruten');

    // Random img
    const num = 1 + Math.round(Math.random() * 1);

    this.onCommand((msg) => {
      try {
        msg.channel.send('', { files: [path.resolve(`static/images/ruten${num}.jpg`)] });
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
