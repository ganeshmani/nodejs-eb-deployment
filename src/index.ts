import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './db-config';
import { movieRouter } from './routes/movie.routes';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send(`Welcome to the server! ${JSON.stringify(process.env)}`);
});

// app.use('/api', movieRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({
    error: err.message,
  });
});

// AppDataSource.initialize()
//   .then(async () => {
console.log('[server]: Connected to the database');
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
// })
// .catch((err) => {
//   console.log(err);
// });
