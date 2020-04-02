import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../models/Movie';
import { SearchResult } from '../models/SearchResult';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies: Movie[];
  selectedMovie = null;
  editedMovie: Movie = null;


  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');
    if (!mrToken) {
      this.router.navigate(['/auth']);
    } else {
      this.apiService.getMovies().subscribe(
        ( data: Movie[] ) => {
          this.movies = data;
        },
        error => console.log(error)
      );
    }
  }

  selectResult(movie: SearchResult) {
    this.apiService.getMovieOmdb(movie.imdbID).subscribe(
      data => {
        this.selectedMovie = data;
      }
    );
    this.editedMovie = null;
  }

  selectMovie(movie: Movie) {
    this.apiService.getMovie(movie.imdbID).subscribe(
      data => {
        this.selectedMovie = data;
      }
    );
    this.editedMovie = null;
  }

  editMovie(movie: SearchResult) {
    this.apiService.getMovieOmdb(movie.imdbID).subscribe(
      (data: Movie) => {
        this.editedMovie = data;
      },
      error => console.log(error)
    );
    this.selectedMovie = null;
  }
  createMovie() {
    this.editedMovie = {imdbID: ' ', Title: ' ', Plot: ' ', Year: 0, Runtime: ' ', Genre: ' ',
    Director: ' ', Actors: ' ', Poster: ' ', avg_rating: 0, no_of_ratings: 0};
    this.selectedMovie = null;
  }

  delMovie(movie: Movie) {
    this.apiService.deleteMovie(movie.imdbID).subscribe(
      data => {
        this.movies = this.movies.filter((mov: { imdbID: string }) => mov.imdbID !== movie.imdbID);
      },
      error => console.log(error)
    );
    this.selectedMovie = null;
    this.editedMovie = null;
  }
  movieCreated(movie: Movie) {
    this.movies.push(movie);
    this.selectedMovie = movie;
    this.editedMovie = null;
  }
  movieUpdated(movie: Movie) {
    const indx = this.movies.findIndex((mov: { imdbID: string; }) => mov.imdbID === movie.imdbID);
    if (indx >= 0) {
      this.movies[indx] = movie;
    }
    this.editedMovie = null;
  }

  logout() {
    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth']);
  }
}
