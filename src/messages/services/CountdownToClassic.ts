import Discord from 'discord.js';
import dayjs from 'dayjs';
import { CronJob } from 'cron';
import Message from '../Message';

type Channel = Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel;

export class CountdownToClassic extends Message {
  private static started = false;
  private releaseDate = dayjs('2019-08-27');;

  constructor(discordClient: Discord.Client) {
    super(discordClient, 'countdown');

    this.onMessage(async (msg) => {
      // Send DM to starter
      const dm = await msg.author.createDM();

      if (!CountdownToClassic.started) {
        dm.send('Countdown to Classic release started!');

        this.initCountdown(msg.channel);
      } else {
        await dm.send('Countdown to Classic has already started.');
        await dm.send(`Days until release: ${this.getDiff('day')}`);
      }
    });
  }

  private getDiff = (unitType: dayjs.QUnitType) => {
    const now = new Date();

    return dayjs(this.releaseDate).diff(now, unitType);
  }

  private generateCountdownCronJob = (channel: Channel) => (cronTime: string, unitType: dayjs.QUnitType) => {
    const onTick = () => {
      const diff = this.getDiff(unitType);
      const plural = diff !== 1 ? 's' : '';

      channel.send(`⏰ ${diff} ${unitType}${plural} until Classic release!`);
    };

    return new CronJob(cronTime, onTick, undefined, true, 'Europe/Amsterdam');
  }

  private initCountdown = (channel: Channel) => {
    const cronJob = this.generateCountdownCronJob(channel);

    // Until the 25th of August, every 07:00 hour
    const cronCountdownDays = cronJob('0 0 7 1-25 0-7 *', 'day');

    // On 26th of August, every hour on the clock
    const cronCountdownHours = cronJob('0 0 0-23 26 7 *', 'hour');

    // On 26th of August, every minute from 23:50 to 23:59
    const cronCountdownMinutes = cronJob('0 50-59 23 26 7 *', 'minute');

    // On 27th of August, at 00:00:00, stop the countdown cron jobs
    new CronJob('0 0 0 27 7 *', () => {
      cronCountdownDays.stop();
      cronCountdownHours.stop();
      cronCountdownMinutes.stop();

      channel.send('Classic is live! Have fun fuckers!!!');
    }, undefined, true, 'Europe/Amsterdam');

    CountdownToClassic.started = true;
  }
}
