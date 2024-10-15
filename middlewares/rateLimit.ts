import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Suivi de l'utilisation par token
const usage: { [key: string]: { words: number; reset: number } } = {}; 

export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Vérifier si le token est fourni
  if (!token) {
    return res.status(401).json({ error: 'Accès refusé' });
  }

  // Vérifier le token JWT
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }

    const currentTime = Date.now();
    const dailyLimit = 80000; // Définir la limite quotidienne à 80 000 mots

    // Initialiser l'utilisation pour un nouveau token
    if (!usage[token]) {
      usage[token] = { words: 0, reset: currentTime + 24 * 60 * 60 * 1000 }; // 24 heures
    }

    // Réinitialiser le compteur de mots après 24 heures
    if (currentTime > usage[token].reset) {
      usage[token].words = 0;
      usage[token].reset = currentTime + 24 * 60 * 60 * 1000;
    }

    const text = req.body as string; // Supposer que le corps est du type texte/plain
    const wordCount = text.split(/\s+/).length; // Compter le nombre de mots

    // Vérifier si la limite quotidienne est dépassée
    if (usage[token].words + wordCount > dailyLimit) {
      return res.status(402).json({ error: 'Paiement requis : limite quotidienne dépassée' });
    }

    usage[token].words += wordCount; // Ajouter au compteur de mots
    next(); // Passer au middleware suivant
  });
};