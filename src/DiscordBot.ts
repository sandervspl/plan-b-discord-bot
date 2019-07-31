import Discord from 'discord.js';
import messages from './commands/services';
import services from './services';

class DiscordBot {
  public readonly client = new Discord.Client();

  constructor() {
    this.client.login(process.env.BOT_TOKEN);

    this.client.on('ready', () => {
      console.info('Discord bot activated.');

      this.initServices();
      this.initMessageServices();
    });
  }

  private initServices = () => {
    services.forEach((services) => new services(this.client));
  }

  private initMessageServices = () => {
    messages.forEach((message) => new message(this.client));
  }
}

export default DiscordBot;
