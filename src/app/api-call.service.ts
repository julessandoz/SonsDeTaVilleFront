import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  sounds: any = [];

  constructor(private http: HttpClient) { }

  getAllSounds(){
    this.http.get(`https://sons-de-ta-ville.onrender.com/sounds`)
    .subscribe((data) =>{
      console.log(data)
      this.sounds = data;
    })
    return this.sounds;
  }
}
