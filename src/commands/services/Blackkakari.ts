import Discord from 'discord.js';
import Command from '../Command';

export class Blackkakari extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'blackkakari');

    this.onCommand((msg) => {
      msg.channel.send('https://media.discordapp.net/attachments/381298060107579403/660222421088993281/hot_anime_chick.mp4');
    });
  }
}
