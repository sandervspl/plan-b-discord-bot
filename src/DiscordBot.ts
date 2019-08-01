import Discord from 'discord.js';
import commands from './commands/services';
import services from './services';

class DiscordBot {
  public readonly client = new Discord.Client();

  constructor() {
    this.client.login(process.env.BOT_TOKEN);

    this.client.on('ready', () => {
      console.info('Discord bot activated.');

      this.initServices();
      this.initCommands();
    });
  }

  private initServices = () => {
    services.forEach((services) => new services(this.client));
  }

  private initCommands = () => {
    commands.forEach((command) => new command(this.client));
  }
}

export default DiscordBot;
