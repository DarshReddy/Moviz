import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  movieForm: FormGroup;
  imdbID = null;
  sMovie: Movie;

  @Input() set movie(val: Movie) {
    this.imdbID = val.imdbID;
    this.sMovie = val;
    this.movieForm = new FormGroup({
      title: new FormControl(val.Title),
      year: new FormControl(val.Year),
      runtime: new FormControl(val.Runtime),
      genre: new FormControl(val.Genre),
      director: new FormControl(val.Director),
      actors: new FormControl(val.Actors),
      plot: new FormControl(val.Plot)
   });
  }
  @Output() movieCreated = new EventEmitter<Movie>();


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  // formDisabled() {
  //   if (this.movieForm.value.title.length && this.movieForm.value.plot.length) {
  //     return false;
  //   }
  //   return true;
  // }

  saveForm() {
    if (this.imdbID) {
        this.apiService.createMovie(this.imdbID,
        this.movieForm.value.title, this.movieForm.value.plot,
        this.movieForm.value.year, this.movieForm.value.runtime,
        this.movieForm.value.genre, this.movieForm.value.director, this.movieForm.value.actors, this.sMovie.Poster).subscribe(
        (result: Movie) => {
          this.movieCreated.emit(result);
        },
        error => console.log(error)
      );
    }
  }
}
