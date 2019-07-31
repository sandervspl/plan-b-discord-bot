import Discord from 'discord.js';
import moment from 'moment';
import Command from '../Command';

export class Release extends Command {
  private releaseDate = moment('2019-08-27');

  constructor(discordClient: Discord.Client) {
    super(discordClient, 'release');

    this.onMessage(async (msg) => {
      const now = moment();
      const releaseDate = moment(this.releaseDate);
      const diff = releaseDate.diff(now);
      const duration = moment.duration(diff);

      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      msg.channel.send(
        'Classic will release in ' +
        `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds!`
      );
    });
  }
}
