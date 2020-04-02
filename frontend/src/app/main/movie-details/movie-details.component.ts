import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../api.service';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: Movie;
  @Output() updateMovie = new EventEmitter();
  faStar = faStar;
  rateHovered = 0;
  rateClick = 0;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  rateHover(rate: number) {
    this.rateHovered = rate;
  }

  rateClicked(rate: any) {
    this.apiService.rateMovies(rate, this.movie.imdbID, 'TODO comments here').subscribe(
      (result: any) => this.getDetails(),
      (error: any) => console.log(error)
    );
  }

  getDetails() {
    this.apiService.getMovie(this.movie.imdbID).subscribe(
      movie => {
            this.updateMovie.emit(movie);
            this.rateClick = 0;
            this.rateHovered = 0;
          },
      (error: any) => console.log(error)
    );
  }
}
