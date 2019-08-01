import path from 'path';
import Discord from 'discord.js';
import Command from '../Command';

export class Dekis extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'dekis');

    this.onCommand((msg) => {
      msg.channel.send('', { files: [path.resolve('static/images/dekis.jpg')] });
    });
  }
}
