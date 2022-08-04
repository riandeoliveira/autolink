import dotenv from "dotenv";

dotenv.config();

export const EMAIL: string = process.env.EMAIL || "";
export const PASSWORD: string = process.env.PASSWORD || "";
