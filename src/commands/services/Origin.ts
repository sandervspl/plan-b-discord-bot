import path from 'path';
import Discord from 'discord.js';
import Command from '../Command';

export class Origin extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'origin');

    this.onCommand((msg) => {
      try {
        msg.channel.send('', { files: [path.resolve('static/images/origin.jpg')] });
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
