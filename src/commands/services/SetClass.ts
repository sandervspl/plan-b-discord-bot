import Discord from 'discord.js';
import _ from 'lodash';
import Command from '../Command';

export class SetClass extends Command {
  private availableRoles = {
    druid: '583026145499545620',
    hunter: '583025969195909150',
    warrior: '583022884444700675',
    shaman: '583023313450827786',
    mage: '583023260128641044',
    rogue: '583025901583990784',
    priest: '583026016495337472',
    warlock: '583026096359079937',
  };

  constructor(discordClient: Discord.Client) {
    super(discordClient, 'setclass', { cooldown: 5000 });

    this.onCommand(async (msg, args) => {
      const { availableRoles } = this;
      const request = args[0].toLowerCase().trim() as keyof typeof availableRoles;
      const classNames = Object.keys(availableRoles).sort();

      if (!request) {
        return msg.channel.send(
          `Available class roles: ${classNames.join(', ')}`
        );
      }

      if (!classNames.includes(request)) {
        return msg.channel.send('This class role is not available.');
      }

      const classRoleIds = Object.values(availableRoles);
      const memberRoleIds = msg.member.roles.map((role) => role.id);
      const curClassRoles = _.intersection(classRoleIds, memberRoleIds);

      // Remove existing class roles
      if (curClassRoles.length > 0) {
        await msg.member.removeRoles(curClassRoles);
      }

      try {
        await msg.member.addRole(availableRoles[request]);

        const dm = await msg.author.createDM();
        dm.send(`Class role set to '${request}'`);
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
