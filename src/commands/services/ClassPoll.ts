import Discord from 'discord.js';
import { ClassPollService } from 'services/ClassPoll';
import Command from '../Command';

export class ClassPoll extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'classpoll', {
      roles: ['guild officer'],
    });

    this.onCommand(async (msg) => {
      // Delete command message
      const DEL_TIMEOUT = 200;
      await msg.delete(DEL_TIMEOUT);

      const pollMsg = await msg
        .channel
        .send('Select your class to give yourself the class role.') as Discord.Message;

      ClassPollService.reactionIds.forEach((_, reactionId) => {
        pollMsg.react(reactionId);
      });
    });
  }
}
