import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import textRoutes from './routes/textRoutes';  
import authRoutes from './routes/authRoutes';
import filesRouthes from './routes/filesRouthes'
import { errorHandler } from './middlewares/errorHandler'; 
import { Request, Response } from 'express';
import path from 'path';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:5173'],
  })
);


app.use('/api', textRoutes);
app.use('/api/auth', authRoutes);

app.use('/uploads', express.static(path.join(__dirname, '../src/uploads')));
app.use('/api/file', filesRouthes);


app.get('/', (req: Request, res: Response) => {
  res.end('API CONECTADO');
});

// Middleware global de errores
app.use(errorHandler);

export default app;
