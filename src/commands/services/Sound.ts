import path from 'path';
import fs from 'fs';
import Discord from 'discord.js';
import Command from '../Command';

export class Sound extends Command {
  private readonly files = fs
    .readdirSync(path.resolve('static/audio'))
    .reduce((prev, cur) => ({
      ...prev,
      [cur.split('.')[0]]: path.resolve('static/audio', cur),
    }), {} as Record<string, string>);

  constructor(discordClient: Discord.Client) {
    super(discordClient, 'sound', { cooldown: 5000 });

    const sortedFileCommands = Object.keys(this.files)
      .sort()
      .join(', ');

    this.onCommand((msg, [request]) => {
      if (!request) {
        return msg.channel.send(`Available sound files: ${sortedFileCommands}`);
      }

      if (!this.files[request]) {
        return msg.channel.send(`Could not find an audio clip for '${request}'`);
      }

      try {
        msg.channel.send('', { files: [this.files[request]] });
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
