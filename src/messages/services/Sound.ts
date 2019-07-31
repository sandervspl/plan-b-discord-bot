import path from 'path';
import Discord from 'discord.js';
import Message from '../Message';

export class Sound extends Message {
  private readonly audioPathBase = path.resolve('src/static/audio');
  private readonly files: Record<string, string> = {
    ragnaros: `${this.audioPathBase}/RagnarosSpecialAttack01.wav`,
    orby: `${this.audioPathBase}/fuckorby.mp3`,
    kanker: `${this.audioPathBase}/kenkerintheass.mp3`,
    '12': `${this.audioPathBase}/everybodylistentothe12yearold.mp3`,
  }

  constructor(discordClient: Discord.Client) {
    super(discordClient, 'sound');

    this.onMessage((msg) => {
      const [request] = this.getArgs(msg.content);

      if (!this.files[request]) {
        return msg.channel.send(`Could not find an audio clip for '${request}'`);
      }

      try {
        msg.channel.send('', { files: [this.files[request]] });
      } catch (err) {
        msg.channel.send('😅 Ah fuck, something went wrong.');
      }
    });
  }
}
