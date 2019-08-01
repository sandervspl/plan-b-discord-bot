import Discord from 'discord.js';
import commands from '.';
import Command from '../Command';

export class Commands extends Command {
  constructor(discordClient: Discord.Client) {
    super(discordClient, 'commands');

    const excluded = ['ping', 'marco', 'commands'];
    const commandNames = commands
      .map((cmd) => cmd.name.toLowerCase())
      .filter((cmd) => !excluded.includes(cmd));

    this.onCommand((msg) => {
      msg.channel.send(`Available commands: ${commandNames.join(', ')}`);
    });
  }
}
