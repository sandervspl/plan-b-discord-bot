import Discord from 'discord.js';
import Message from '../Message';

export class Ping extends Message {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'ping');

    this.onMessage((msg) => {
      if (msg.author.id === '77783102469967872') { // Misa
        msg.reply('Pong!');
      }
    });
  }
}
