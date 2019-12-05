import Discord from 'discord.js';
import Command from '../Command';

export class Fyrn extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'fyrn');

    this.onCommand((msg) => {
      try {
        msg.channel.send('https://clips.twitch.tv/BumblingPluckyClipsmomFloof');
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
