import Discord from 'discord.js';
import Command from '../Command';

export class Ping extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'ping');

    this.onCommand((msg) => {
      msg.reply('Pong!');
    });
  }
}
