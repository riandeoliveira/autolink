const dotenv = require("dotenv");

dotenv.config();

const EMAIL = process.env.EMAIL ?? "";
const PASSWORD = process.env.PASSWORD ?? "";
const BOT_TOKEN = process.env.BOT_TOKEN ?? "";
const CHAT_ID = process.env.CHAT_ID ?? "";

module.exports = { EMAIL, PASSWORD, BOT_TOKEN, CHAT_ID };
