import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://vizmov.herokuapp.com/';
  baseMovieUrl = `${this.baseUrl}api/movies/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  omdbUrl = 'https://www.omdbapi.com/?apikey=cd407587&plot=short&';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  getMovies() {
    return this.httpClient.get(this.baseMovieUrl, {headers: this.getAuthHeaders()});
  }

  getMovie(imdbID: string) {
    return this.httpClient.get(`${this.baseMovieUrl}${imdbID}/`, {headers: this.getAuthHeaders()});
  }

  updateMovie(imdbID: string, Title: string, Plot: string, Year: number, Runtime: string,
              Genre: string, Director: string, Actors: string, Poster: string) {
    const body = JSON.stringify({imdbID, Title, Plot, Year, Runtime, Genre, Director, Actors, Poster});
    return this.httpClient.put(`${this.baseMovieUrl}${imdbID}/`, body,  {headers: this.getAuthHeaders()});
  }

  deleteMovie(imdbID: string) {
    return this.httpClient.delete(`${this.baseMovieUrl}${imdbID}/`, {headers: this.getAuthHeaders()});
  }

  createMovie(imdbID: string, Title: string, Plot: string, Year: number, Runtime: string,
              Genre: string, Director: string, Actors: string, Poster: string) {
    const body = JSON.stringify({imdbID, Title, Plot, Year, Runtime, Genre, Director, Actors, Poster});
    return this.httpClient.post(this.baseMovieUrl, body,  {headers: this.getAuthHeaders()});
  }

  rateMovies(rate: number, imdbID: string, comment: string) {
    const body = JSON.stringify({stars: rate, comments: comment});
    return this.httpClient.post(`${this.baseMovieUrl}${imdbID}/rate_movie/`, body, {headers: this.getAuthHeaders()});
  }

  loginUser(authData: any) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers: this.getAuthHeaders()});
  }

  registerUser(authData: any) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, {headers: this.headers});
  }

  getAuthHeaders() {
    const token = this.cookieService.get('mr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: `Token ${token}`
    });
  }

  searchMovies(keyword: string) {
    return this.httpClient.get(`${this.omdbUrl}s=${keyword}`);
  }

  getMovieOmdb(id: string) {
    return this.httpClient.get(`${this.omdbUrl}i=${id}`);
  }
}
