import { Router } from 'express';
import { MovieController } from '../controllers/movie.controllers';

const _router = Router();

_router.get('/', (req, res) => {
  res.send('Welcome to the movie route!');
});

_router.get('/movies', MovieController.getAllMovies);
_router.post('/movies', MovieController.createMovie);

_router.put('/movies/:id', MovieController.updateMovie);
_router.delete('/movies/:id', MovieController.deleteMovie);

export { _router as movieRouter };
