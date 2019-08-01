import Discord from 'discord.js';
import Command from '../Command';

export class Marco extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'marco');

    this.onCommand((msg) => {
      msg.channel.send('Polo!');
    });
  }
}
