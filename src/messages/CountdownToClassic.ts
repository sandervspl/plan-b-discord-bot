import Discord from 'discord.js';
import dayjs from 'dayjs';
import { CronJob } from 'cron';
import Message from './Message';

export class CountdownToClassic extends Message {
  static started = false;

  constructor(discordClient: Discord.Client) {
    super(discordClient, 'countdown');

    this.onMessage((msg) => {
      if (!CountdownToClassic.started) {
        msg.channel.send('Countdown to Classic release started!');

        this.initCountdown(msg.channel);
      } else {
        // @TODO show days until release
        msg.channel.send('Countdown to Classic has already started.');
      }
    });
  }

  private getDiffDays = () => {
    const releaseDate = dayjs('2019-08-27');
    const now = new Date();

    return dayjs(releaseDate).diff(now, 'day');
  }

  private getDiffHours = () => {
    const releaseDate = dayjs('2019-08-27');
    const now = new Date();

    return dayjs(releaseDate).diff(now, 'hour');
  }

  private getDiffMins = () => {
    const releaseDate = dayjs('2019-08-27');
    const now = new Date();

    return dayjs(releaseDate).diff(now, 'minute');
  }

  private initCountdown = (channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel) => {
    // Until the 25th of August, every 07:00 hour
    const cronCountdownDays = new CronJob('0 0 7 1-25 0-7 *', () => {
      const diff = this.getDiffDays();

      channel.send(`⏰ ${diff} day${diff !== 1 ? 's' : ''} until Classic release!`);
    }, undefined, true, 'Europe/Amsterdam');

    // On 26th of August, every hour on the clock
    const cronCountdownHours = new CronJob('0 0 0-23 26 7 *', () => {
      const diff = this.getDiffHours();

      channel.send(`⏰ ${diff} hour${diff !== 1 ? 's' : ''} until Classic release!`);
    }, undefined, true, 'Europe/Amsterdam');

    // On 26th of August, every minute from 23:50 to 23:59
    const cronCountdownMinutes = new CronJob('0 50-59 23 26 7 *', () => {
      const diff = this.getDiffMins();

      channel.send(`⏰ ${diff} minute${diff !== 1 ? 's' : ''} until Classic release!`);
    }, undefined, true, 'Europe/Amsterdam');

    // On 27th of August, at 00:00:00, stop the countdown cron jobs
    new CronJob('0 0 0 27 7 *', () => {
      cronCountdownDays.stop();
      cronCountdownHours.stop();
      cronCountdownMinutes.stop();

      channel.send('Classic is live! Have fun fuckers!!!');
    }, undefined, true, 'Europe/Amsterdam');

    const diff = this.getDiffDays();

    channel.send(`⏰ ${diff} day${diff !== 1 ? 's' : ''} until Classic release!`);

    CountdownToClassic.started = true;
  }
}
