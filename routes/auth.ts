import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Interface pour le corps de la requête contenant l'email
interface TokenRequestBody {
  email: string;
}

const router = Router();

// Route pour générer un token
router.post('/token', (req: Request<{}, {}, TokenRequestBody>, res: Response<any>) => {
  const { email } = req.body;

  // Vérifie si l'email est fourni
  if (!email) {
    return res.status(400).json({ error: 'L\'email est requis' });
  }

  // Générer un token
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

  // Renvoie le token dans la réponse
  res.json({ token });
});

// Exporter le routeur pour l'utiliser dans d'autres fichiers
export default router;
