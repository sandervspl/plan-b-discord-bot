import path from 'path';
import fs from 'fs';
import Discord from 'discord.js';
import Command from '../Command';

export class Sound extends Command {
  private readonly files = new Map<string, string>();

  constructor(discordClient: Discord.Client) {
    super(discordClient, 'sound', { cooldown: 5000 });

    fs
      .readdirSync(path.resolve('static/audio'))
      .forEach((fileName) => {
        const fileNameWithoutExt = fileName.split('.')[0];

        this.files.set(fileNameWithoutExt, path.resolve('static/audio', fileName));
      });

    const sortedFileCommands = Array.from(this.files.keys())
      .sort()
      .join(', ');

    this.onCommand((msg, [request]) => {
      if (!request) {
        return msg.channel.send(`Available sound files: ${sortedFileCommands}`);
      }

      if (!this.files.has(request)) {
        return msg.channel.send(`Could not find an audio clip for '${request}'`);
      }

      try {
        const soundFile = this.files.get(request);

        if (soundFile) {
          msg.channel.send('', { files: [soundFile] });
        } else {
          this.onError(msg, '😢 Something went wrong while looking up the sound file.');
        }
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
