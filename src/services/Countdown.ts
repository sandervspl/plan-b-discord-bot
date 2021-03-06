import Discord from 'discord.js';
import moment from 'moment';
import { CronJob } from 'cron';

export class Countdown {
  private releaseDate = moment('2019-08-27');
  private channel: Discord.TextChannel | undefined;

  constructor(
    private discordClient: Discord.Client
  ) {
    // general
    this.channel = this.discordClient.channels.get('497799504540598282') as Discord.TextChannel;

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
      const offset = 1; // Because of milliseconds it will drop down 1 unit too low
      const diff = this.getDiff(unitType) + offset;
      const plural = diff !== 1 ? 's' : '';

      this.channel!.send(`⏰ ${diff} ${unitType}${plural} until Classic release!`);
    };

    return new CronJob(cronTime, onTick, undefined, true, 'Europe/Amsterdam');
  }

  public initCountdown = () => {
    // Until the 25th of August, every 07:00 hour
    const cronCountdownDays = this.generateCronJob('0 0 7 0-25 0-7 *', 'day');

    // On 26th of August, every hour on the clock
    const cronCountdownHours = this.generateCronJob('0 0 7-23 26 7 *', 'hour');

    // On 26th of August, every minute from 23:50 to 23:59
    const cronCountdownMinutes = this.generateCronJob('0 50-59 23 26 7 *', 'minute');

    // On 26th of August, every second from 23:59:50 to 23:59:59
    const cronCountdownSeconds = this.generateCronJob('50-59 59 23 26 7 *', 'second');

    // On 27th of August, at 00:00:00, stop the countdown cron jobs
    new CronJob('0 0 0 27 7 *', () => {
      cronCountdownDays.stop();
      cronCountdownHours.stop();
      cronCountdownMinutes.stop();
      cronCountdownSeconds.stop();

      // @ts-ignore according to docs this is possible
      this.channel!.send('Classic is live! Have fun fuckers!!!');
    }, undefined, true, 'Europe/Amsterdam');
  }
}
