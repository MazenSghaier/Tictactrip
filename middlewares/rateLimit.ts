import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const usage: { [key: string]: { words: number; reset: number } } = {}; // Track usage per token

export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    const currentTime = Date.now();
    const dailyLimit = 80000; // Set daily word limit to 80,000 words

    if (!usage[token]) {
      usage[token] = { words: 0, reset: currentTime + 24 * 60 * 60 * 1000 }; // 24 hours
    }

    if (currentTime > usage[token].reset) {
      // Reset the word count after 24 hours
      usage[token].words = 0;
      usage[token].reset = currentTime + 24 * 60 * 60 * 1000;
    }

    const text = req.body as string; // Assuming text/plain body
    const wordCount = text.split(/\s+/).length; // Count the number of words

    if (usage[token].words + wordCount > dailyLimit) {
      return res.status(402).json({ error: 'Payment required: daily limit exceeded' });
    }

    usage[token].words += wordCount;
    next();
  });
};
