import Discord from 'discord.js';

type ReactionId = string;

export class ClassPollService {
  private readonly EVENTS = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
  };

  static readonly reactionIds: Map<ReactionId, {
    id: string;
    name: string;
  }> = new Map();

  constructor(
    private discordClient: Discord.Client
  ) {
    // Reaction ID, Role ID
    ClassPollService.reactionIds.set('631115380580155412', {
      id: '583026145499545620',
      name: 'Druid',
    });
    ClassPollService.reactionIds.set('631115438172012565', {
      id: '583025969195909150',
      name: 'Hunter',
    });
    ClassPollService.reactionIds.set('631115483621490729', {
      id: '583023260128641044',
      name: 'Mage',
    });
    ClassPollService.reactionIds.set('631115534330494976', {
      id: '583026016495337472',
      name: 'Priest',
    });
    ClassPollService.reactionIds.set('631115581742907392', {
      id: '583025901583990784',
      name: 'Rogue',
    });
    ClassPollService.reactionIds.set('631115626664165415', {
      id: '583023313450827786',
      name: 'Shaman',
    });
    ClassPollService.reactionIds.set('631115668238106635', {
      id: '583026096359079937',
      name: 'Warlock',
    });
    ClassPollService.reactionIds.set('631115729688854596', {
      id: '583022884444700675',
      name: 'Warrior',
    });

    discordClient.on('raw', this.handleUserReaction);
  }

  /** @todo fix 'event' type */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleUserReaction = async (event: any) => {
    if (!this.EVENTS.hasOwnProperty(event.t)) {
      return;
    }

    const { d: data } = event;

    const channel = this.discordClient.channels.get(data.channel_id);

    // Prevents re-emitting?
    // @ts-ignore
    // if (channel.messages.has(data.message_id)) {
    //   return;
    // }

    // @ts-ignore
    const message: Discord.Message = await channel.fetchMessage(data.message_id);

    if (!message.content.includes('Select your class')) {
      return;
    }

    const user = message.guild.members.find((member) => member.id === data.user_id);

    if (!user) {
      return;
    }

    if (!data.emoji.id) {
      return;
    }

    // Add selected role to user
    const role = ClassPollService.reactionIds.get(data.emoji.id);

    if (!role) {
      return;
    }

    if (user.roles.has(role.id)) {
      await user.removeRole(role.id);

      const dm = await user.createDM();
      dm.send(`Removed '${role.name}' role.`);
    } else {
      await user.addRole(role.id);

      const dm = await user.createDM();
      dm.send(`Class role set to '${role.name}'.`);
    }
  }
}
