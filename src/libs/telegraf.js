const { Telegraf } = require("telegraf");
const { BOT_TOKEN, CHAT_ID } = require("./dotenv");

const sendMessageToBot = (data) => {
  const bot = new Telegraf(BOT_TOKEN);

  bot.telegram.sendMessage(CHAT_ID, data);
};

module.exports = { sendMessageToBot };
