import express from 'express';
import mongoose from 'mongoose';
import { setRoutes } from './routes/index';
import { seedDatabase } from './seed';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/octofit_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as any)
.then(async () => {
    console.log('Connected to MongoDB');
    // Seed database with sample data
    await seedDatabase();
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Set up routes
setRoutes(app);

// Environment-aware base URL
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${baseUrl}`);
});