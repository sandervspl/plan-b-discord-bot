import dotenv from 'dotenv';
import 'dayjs/locale/en-gb';
import dayjs from 'dayjs';
import express from 'express';
import DiscordBot from 'DiscordBot';

dotenv.config();

dayjs.locale('en-gb');

const app = express();
const PORT_DEFAULT = 5000;

app.listen(Number(process.env.PORT) || PORT_DEFAULT, () => {
  new DiscordBot();
});
