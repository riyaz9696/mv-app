import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TmdbApiService } from './../../../services/tmdb-api.service';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  providers:[TmdbApiService]
})

export class MovieSearchComponent implements OnInit {
  @Output() success = new EventEmitter<any>();
  public moviesList=[];
  public movieSearch: string; 
  public errorMsg ='';
  public showError : boolean = false;

  constructor(private tmdbApiService : TmdbApiService) {
  }

  ngOnInit() {
  }

  // Function to get search text and make service call to get movies from TMDB
  searchMovie(){
      this.moviesList=[];
      this.onEventEmit(this.moviesList);
    this.tmdbApiService.searchMovie(this.movieSearch).subscribe((res) =>{
      this.moviesList = res.results;
     this.onEventEmit(this.moviesList);
    }, (error) =>{
      this.errorMsg = error._body;
      this.showError = true;
    })
  }

//send movielist to the movies component
  onEventEmit(moviesList: any) {
     this.success.emit({
        'moviesList': moviesList
      });
  }
}



