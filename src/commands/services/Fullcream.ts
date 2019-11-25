import path from 'path';
import Discord from 'discord.js';
import Command from '../Command';

export class Fullcream extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'fullcream');

    this.onCommand((msg) => {
      try {
        msg.channel.send('', { files: [path.resolve('static/images/fullcream.png')] });
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
