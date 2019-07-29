import Discord from 'discord.js';
import Message from '../Message';

export class Marco extends Message {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'marco');

    this.onMessage((msg) => {
      msg.channel.send('Polo!');
    });
  }
}
