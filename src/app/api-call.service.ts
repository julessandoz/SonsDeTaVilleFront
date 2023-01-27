import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  sounds: any = [];
  categories: any = [];

  constructor(private http: HttpClient) { }

  getAllSounds(){
    return this.http.get(`https://sons-de-ta-ville.onrender.com/sounds`)
  }

  getFilteredSounds(params){
    const options = {params: params}
    return this.http.get(`https://sons-de-ta-ville.onrender.com/sounds`, options)

  }
  getAllCategories(){
    return this.http.get(`https://sons-de-ta-ville.onrender.com/categories`)
    }
  
  createSound(sound, categoryName: string, coordinates){

    const formData = new FormData();
    formData.append('uploaded_audio', sound);
    formData.append('category', categoryName);
    formData.append('lat', coordinates.latitude);
    formData.append('lng', coordinates.longitude);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = { headers: headers, responseType: 'text' as const}
    return this.http.post(`https://sons-de-ta-ville.onrender.com/sounds`, formData, options)
  }

  getUserSounds(userId: String){
    return this.http.get(`https://sons-de-ta-ville.onrender.com/sounds/?userId=${userId}`);
  }


}
