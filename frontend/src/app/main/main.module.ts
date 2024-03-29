import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ApiService } from '../api.service';
const routes: Routes = [
  {path: 'movies', component: MainComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    // MatAutocompleteModule,
    // MatChipsModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatInputModule,
    // BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ]
})
export class MainModule { }
