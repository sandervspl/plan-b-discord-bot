import Discord from 'discord.js';
import _ from 'lodash';
import Command from '../Command';

export class SetClass extends Command {
  private availableRoles: Map<string, string> = new Map();

  constructor(discordClient: Discord.Client) {
    super(discordClient, 'setclass', { cooldown: 5000 });

    this.availableRoles.set('druid', '583026145499545620');
    this.availableRoles.set('hunter', '583025969195909150');
    this.availableRoles.set('mage', '583023260128641044');
    this.availableRoles.set('priest', '583026016495337472');
    this.availableRoles.set('rogue', '583025901583990784');
    this.availableRoles.set('shaman', '583023313450827786');
    this.availableRoles.set('warlock', '583026096359079937');
    this.availableRoles.set('warrior', '583022884444700675');

    this.onCommand(async (msg, args) => {
      const { availableRoles } = this;
      let request = args[0] as keyof typeof availableRoles;
      const classNames = new Map(Array.from(availableRoles).sort());

      if (!request) {
        return msg.channel.send(
          `Available class roles: ${Array.from(classNames.keys()).join(', ')}`
        );
      }

      request = request.toLowerCase().trim() as keyof typeof availableRoles;

      if (!classNames.has(request)) {
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
        const role = availableRoles.get(request);

        if (role) {
          await msg.member.addRole(role);

          const dm = await msg.author.createDM();
          dm.send(`Class role set to '${request}'`);
        } else {
          this.onError(msg, '😢 Something went wrong when trying to add your new role.');
        }
      } catch (err) {
        this.onError(msg, err);
      }
    });
  }
}
