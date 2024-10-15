import { Router, Request, Response } from 'express';
import { rateLimit } from '../middlewares/rateLimit'; // Import the rate-limiting middleware

const router = Router();

// Apply rate limit middleware and JWT authentication for the justify route
router.post('/justify', rateLimit, (req: Request, res: Response) => {
  const text = req.body; // Expecting text as a plain string

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required and must be a string' });
  }

  const justifiedText = justifyText(text);
  res.send(justifiedText); // Return the justified text
});

// Helper function to justify the text to 80 characters per line
function justifyText(text: string): string {
  const words = text.split(' ');
  let lines: string[] = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length <= 80) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      lines.push(justifyLine(currentLine));
      currentLine = word;
    }
  });

  if (currentLine) {
    lines.push(justifyLine(currentLine));
  }

  return lines.join('\n');
}

// Helper function to justify a single line
function justifyLine(line: string): string {
  const words = line.split(' ');
  if (words.length === 1) return line; // If only one word, no justification needed

  let totalSpaces = 80 - line.length;
  let gaps = words.length - 1;
  let spaceBetween = Math.floor(totalSpaces / gaps);
  let extraSpaces = totalSpaces % gaps;

  for (let i = 0; i < extraSpaces; i++) {
    words[i] += ' ';
  }

  return words.join(' '.repeat(spaceBetween + 1));
}

export default router;
