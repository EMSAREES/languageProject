import express from 'express';
import { generateDailyText, getTextOfTheDay } from '../controllers/textController';

const router = express.Router();

// router.post('/generate', generateDailyText);
router.get('/generatext', getTextOfTheDay);

export default router;