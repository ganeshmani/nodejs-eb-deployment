import { Request, Response } from 'express';
import { AppDataSource } from '../db-config';
import { Movie } from '../entites/Movies.entity';

export class MovieController {
  static async getAllMovies(req: Request, res: Response) {
    console.log('serving from db');
    const movieRepository = AppDataSource.getRepository(Movie);
    const movies = await movieRepository.find();

    return res.status(200).json({
      data: movies,
    });
  }
  static async createMovie(req: Request, res: Response) {
    const { title, description, director, year, rating, image, cast } =
      req.body;
    const movie = new Movie();
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
    movie.image = image;
    movie.cast = cast;
    const movieRepository = AppDataSource.getRepository(Movie);
    await movieRepository.save(movie);
    return res
      .status(200)
      .json({ message: 'Movie created successfully', movie });
  }

  static async updateMovie(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, director, year, rating, image, cast } =
      req.body;
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { id },
    });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
    movie.image = image;
    movie.cast = cast;
    await movieRepository.save(movie);
    return res
      .status(200)
      .json({ message: 'Movie updated successfully', movie });
  }

  static async deleteMovie(req: Request, res: Response) {
    const { id } = req.params;
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { id },
    });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await movieRepository.remove(movie);
    return res
      .status(200)
      .json({ message: 'Movie deleted successfully', movie });
  }
}
