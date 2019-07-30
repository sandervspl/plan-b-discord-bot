import Discord from 'discord.js';
import moment from 'moment';
import { CronJob } from 'cron';

export class Countdown {
  private releaseDate = moment('2019-08-27');
  private channel: Discord.Channel | undefined;

  constructor(
    private discordClient: Discord.Client
  ) {
    if (process.env.APP_ENV === 'production') {
      this.channel = this.discordClient.channels.get('497799504540598282'); // general
    } else {
      this.channel = this.discordClient.channels.get('561859968681115658'); // testing
    }

    if (this.channel) {
      this.initCountdown();
    } else {
      console.error('Error: could not find text channel');
    }
  }

  private getDiff = (unitType: moment.unitOfTime.Diff) => {
    const now = moment();

    return moment(this.releaseDate).diff(now, unitType);
  }

  private generateCronJob = (cronTime: string, unitType: moment.unitOfTime.Diff) => {
    const onTick = () => {
      const diff = this.getDiff(unitType);
      const plural = diff !== 1 ? 's' : '';

      // @ts-ignore according to docs this is possible
      this.channel!.send(`⏰ ${diff} ${unitType}${plural} until Classic release!`);
    };

    return new CronJob(cronTime, onTick, undefined, true, 'Europe/Amsterdam');
  }

  public initCountdown = () => {
    // Until the 25th of August, every 07:00 hour
    const cronCountdownDays = this.generateCronJob('0 0 7 * 0-7 *', 'day');

    // On 26th of August, every hour on the clock
    const cronCountdownHours = this.generateCronJob('0 0 0-23 26 7 *', 'hour');

    // On 26th of August, every minute from 23:50 to 23:59
    const cronCountdownMinutes = this.generateCronJob('0 50-59 23 26 7 *', 'minute');

    // On 27th of August, at 00:00:00, stop the countdown cron jobs
    new CronJob('0 0 0 27 7 *', () => {
      cronCountdownDays.stop();
      cronCountdownHours.stop();
      cronCountdownMinutes.stop();

      // @ts-ignore according to docs this is possible
      this.channel!.send('Classic is live! Have fun fuckers!!!');
    }, undefined, true, 'Europe/Amsterdam');
  }
}
