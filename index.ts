import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import justifyRoutes from './routes/justify';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser les corps de requête JSON
app.use(express.json());

// Joindre les routes
app.use('/api/auth', authRoutes); // For authentication
app.use('/api', justifyRoutes);   // For text justification

// Endpoint de vérification de la santé (optionnel)
app.get('/api/health', (req, res) => {
    res.status(200).send('API is running');
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; // Exportez l'application pour Vercel
