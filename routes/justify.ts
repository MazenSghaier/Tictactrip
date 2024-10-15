import { Router, Request, Response } from 'express';
import { rateLimit } from '../middlewares/rateLimit'; 

const router = Router();

// Appliquer le middleware de limitation de débit et d'authentification JWT pour la route de justification
router.post('/justify', rateLimit, (req: Request, res: Response) => {
  const text = req.body; 

  // Vérifier si le texte est fourni et qu'il s'agit d'une chaîne
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Le texte est requis et doit être une chaîne' });
  }

  const justifiedText = justifyText(text); // Justifier le texte
  res.send(justifiedText); 
});

// Fonction auxiliaire pour justifier le texte à 80 caractères par ligne
function justifyText(text: string): string {
  const words = text.split(' '); 
  let lines: string[] = []; // Tableau pour stocker les lignes justifiées
  let currentLine = ''; 

  words.forEach(word => {
    // Vérifier si l'ajout du mot à la ligne actuelle dépasse la limite de 80 caractères
    if ((currentLine + word).length <= 80) {
      currentLine += (currentLine ? ' ' : '') + word; 
    } else {
      lines.push(justifyLine(currentLine));
      currentLine = word; 
    }
  });

  // Ajouter la dernière ligne justifiée, si elle existe
  if (currentLine) {
    lines.push(justifyLine(currentLine));
  }

  return lines.join('\n'); // Retourner les lignes justifiées sous forme de chaîne
}

// Fonction auxiliaire pour justifier une seule ligne
function justifyLine(line: string): string {
  const words = line.split(' '); 
  if (words.length === 1) return line;

  let totalSpaces = 80 - line.length;
  let gaps = words.length - 1; 
  let spaceBetween = Math.floor(totalSpaces / gaps); 
  let extraSpaces = totalSpaces % gaps; 
  
  // Ajouter les espaces supplémentaires aux premiers mots
  for (let i = 0; i < extraSpaces; i++) {
    words[i] += ' ';
  }

  return words.join(' '.repeat(spaceBetween + 1)); // Retourner la ligne justifiée
}

export default router;