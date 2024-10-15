import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenRequestBody {
  email: string;
}

const router = Router();

router.post('/token', (req: Request<{}, {}, TokenRequestBody>, res: Response<any>) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Generate a token
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

  res.json({ token });
});


export default router;