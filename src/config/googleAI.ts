import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export default googleAI;
