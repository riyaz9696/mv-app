import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig }from '../config/config.constant';

@Injectable()
export class JsonApiService {

  constructor(private http: Http) { 
  }
  private headers = new Headers({ 'Content-Type': 'application/json' });

// Call rest api to save favourite movie into json database
addToFavourite(movie){ 
  return this.http.post(AppConfig.apiUrl+'/addMovie', movie, {headers: this.headers})
  .map(data => data.json(),
    (error:any) =>this.handleError(error));
}

// Call rest api to update favourite movies data on json database
updateMovies(movie){ 
  console.log(movie);
  return this.http.put(AppConfig.apiUrl+'/updateMovie',movie, {headers: this.headers})
  .map(data => data.json(),
    (error: any)=>this.handleError(error));
}

// Call rest api to get favourite movies from json database
getFavourite(){ 
  return this.http.get(AppConfig.apiUrl+'/allMovies', {headers: this.headers})
  .map(data => data.json(),
    (error: any)=>this.handleError(error));
}

// Call rest api to delete favourite movies from json database
deleteMovie(movieId){ 
  return this.http.delete(AppConfig.apiUrl +'/'+ movieId, {headers: this.headers})
  .map(data => data.json(),
    (error: any)=>this.handleError(error));
}

// Call rest api to login user into user database
loginUser(loginDetails){ 
  return this.http.post(AppConfig.userUrl+'/login',loginDetails, {headers: this.headers})
  .map(data =>data.json(),
    (error:any) =>this.handleError(error));
}

// Call rest api to register user into user database
registerUser(userDetails){ 
  return this.http.post(AppConfig.userUrl+'/register',userDetails, {headers: this.headers})
  .map(userData =>userData.toString(),
    (error:any) =>this.handleError(error));
}

// Handle errors
private handleError(error: Response){
  return Observable.throw(error);
}
}
