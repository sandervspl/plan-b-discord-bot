/* eslint-disable no-magic-numbers */
import { TextChannel, Message } from 'discord.js';
import DiscordBot from 'DiscordBot';
import { Commands } from '.';

describe('Commands', () => {
  const bot = new DiscordBot();
  const command = new Commands(bot.client);

  beforeAll(() => {
    return new Promise((res) => {
      bot.client.on('ready', () => {
        res();
      });
    });
  });

  it('Replies a list of the commands', async (done) => {
    expect.assertions(1);

    const channel = bot.client.channels.get('611163871398592521') as TextChannel;
    const msg = await channel.send('!commands') as Message;

    setTimeout(() => {
      const lastMsg = channel.messages.get(msg.channel.lastMessageID);
      if (lastMsg) {
        const lastMsgContent = lastMsg.content;

        expect(lastMsgContent).toEqual(`Available commands: ${command.commandNames.join(', ')}`);
        done();
      }
    }, 250);
  });
});
