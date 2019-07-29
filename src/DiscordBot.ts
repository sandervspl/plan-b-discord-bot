import Discord from 'discord.js';
import messages from './messages';

class DiscordBot {
  public readonly client = new Discord.Client();

  private channels = {
    general: '497799504540598282',
    testing: '561859968681115658',
  }

  constructor() {
    this.client.login(process.env.BOT_TOKEN);

    this.client.on('ready', () => {
      console.info('Discord bot activated.');
    });

    this.initMessageServices();

  }

  private initMessageServices = () => {
    messages.forEach((message) => new message(this.client));
  }
}

export default DiscordBot;
