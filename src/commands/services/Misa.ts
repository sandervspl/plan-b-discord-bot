import Discord from 'discord.js';
import Command from '../Command';

export class Misa extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'misa');

    this.onCommand((msg) => {
      try {
        msg.channel.send('https://www.youtube.com/watch?v=QNWucprP_ZA');
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
