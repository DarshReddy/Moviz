import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Movie } from 'src/app/models/Movie';
import { SearchResult } from '../../models/SearchResult';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input() movies: Movie[];
  searchMovies: Movie[];
  searchData: SearchResult[] = null;
  editM: Movie;
  delM: Movie;
  @Output() selectMovie = new EventEmitter<Movie>();
  @Output() selectResult = new EventEmitter<SearchResult>();
  @Output() editedMovie = new EventEmitter<Movie>();
  @Output() createMovie = new EventEmitter();
  @Output() deleteMovie = new EventEmitter<Movie>();

  faTrash = faTrash;
  faEdit = faEdit;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getMovies().subscribe(
      (data: Movie[]) => {
        this.movies = data;
      },
      error => console.log(error)
    );
  }

  movieClicked(movie: Movie) {
    this.selectMovie.emit(movie);
  }
  resultClicked(result: SearchResult) {
    this.selectResult.emit(result);
  }
  editMovie(movie: Movie) {
    this.editedMovie.emit(movie);
  }
  delMovie(movie: Movie) {
    this.deleteMovie.emit(movie);
  }

  onSearch(event: { target: { value: string; }; }) {
    this.apiService.searchMovies(event.target.value).subscribe(
      (data: {Search: SearchResult[]} ) => {
        this.searchData = data.Search;
        this.searchMovies = this.movies.filter((mov: {Title: string}) =>
        mov.Title.toLowerCase().includes(event.target.value.toLowerCase()));
      },
      error => console.log(error)
    );
  }
}
