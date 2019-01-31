import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { JsonApiService } from './../../../../services/json-api.service';
import { AppConfig } from './../../../../config/config.constant';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers:[ JsonApiService ]
  
})

export class MovieComponent implements OnInit {
  @Input() movie: any;
  @Input() flag: any;
  @Input() index: any;
  @Output() favArray = new EventEmitter();
  @Output() err =new EventEmitter();
  @Output() update =new EventEmitter();
  public movieUrl=AppConfig.baseUrl;
  public favMovies : any =[];
  public errorMsg ='';
  public showError : boolean = false;
  public selectedMovie : any;

  constructor(private jsonApiService : JsonApiService) {
  }

  ngOnInit() {
  }

    // Add favourite movie to  database
    addToFavorite(movie) {
      this.jsonApiService.addToFavourite(movie).subscribe((res) =>{
        this.getFavorite();
        this.err.emit({
          'errMsg': 'Successfully Added'
        })
        this.showError = false;
      },(error:any)=>{
        this.errorMsg = error.statusText;
        this.err.emit({
          'errMsg': '!Movie Already Added'
        })
        this.showError = true;
      })
    }

  // get data of favourite movies from database
  getFavorite() {
    this.jsonApiService.getFavourite().subscribe((res) =>{
      this.favMovies = res;
      this.favArray.emit({
        'favMovies': this.favMovies
      });
      this.showError = false;
    },(error:any)=>{
      this.errorMsg = error.statusText;
      this.showError = true;
    })
  }

  //Delete movie from database
  deleteMovie(movieId){
    this.jsonApiService.deleteMovie(movieId).subscribe(data=>{
      this.getFavorite();
    },(error:any)=>{
      this.errorMsg = error.statusText;
      this.showError = true;
    })
  }

  // Set Movie details to update
  setMovie(movie) {
    this.update.emit({
          'movie': movie
        })
  }
   

}
