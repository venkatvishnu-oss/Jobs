import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramAlert(job: any) {
  if (!token || !chatId) {
    console.warn('Telegram bot token or chat id not configured. Skipping alert.');
    return;
  }

  try {
    const bot = new TelegramBot(token);
    const message = `New verified job posted:\n*${job.title}* at _${job.companyName}_\n${job.location} | ${job.domain}\nApply: ${job.applyUrl}`;
    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Telegram alert failed:', error);
  }
}
