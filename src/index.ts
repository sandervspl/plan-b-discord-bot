import dotenv from 'dotenv';
import 'dayjs/locale/en-gb';
import dayjs from 'dayjs';
import express from 'express';
import DiscordBot from 'DiscordBot';

dotenv.config();

dayjs.locale('en-gb');

const app = express();

app.listen(Number(process.env.PORT) || 5000, () => {
  new DiscordBot();
});
