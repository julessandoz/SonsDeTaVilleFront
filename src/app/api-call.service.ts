import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  sounds: any = [];
  categories: any = [];

  constructor(private http: HttpClient) {}

  getAllSounds() {
    return this.http.get(`https://sons-de-ta-ville.onrender.com/sounds`);
  }

  getSoundById(soundId) {
    return this.http.get(
      `https://sons-de-ta-ville.onrender.com/sounds/${soundId}`
    );
  }

  getSoundDataById(soundId) {
    return this.http.get(
      `https://sons-de-ta-ville.onrender.com/sounds/data/${soundId}`,
      { responseType: 'text' }
    );
  }

  getFilteredSounds(params) {
    const options = { params: params };
    return this.http.get(
      `https://sons-de-ta-ville.onrender.com/sounds`,
      options
    );
  }
  getAllCategories() {
    return this.http.get(`https://sons-de-ta-ville.onrender.com/categories`);
  }

  getCategoryByName(categoryName) {
    return this.http.get(
      `https://sons-de-ta-ville.onrender.com/categories/${categoryName}`
    );
  }

  createSound(sound, categoryName: string, coordinates) {
    const formData = new FormData();
    formData.append('uploaded_audio', sound);
    formData.append('category', categoryName);
    formData.append('lat', coordinates.latitude);
    formData.append('lng', coordinates.longitude);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = { headers: headers, responseType: 'text' as const };
    return this.http.post(
      `https://sons-de-ta-ville.onrender.com/sounds`,
      formData,
      options
    );
  }

  getUserByUsername(username: string) {
    return this.http.get(
      `https://sons-de-ta-ville.onrender.com/users/${username}`
    );
  }

  getUserById(userId: string) {
    return this.http.get(`https://sons-de-ta-ville.onrender.com/users/id/${userId}`);
  }

  getUserSounds(userId: String) {
    return this.http.get(
      `https://sons-de-ta-ville.onrender.com/sounds/?userId=${userId}`
    );
  }

  updateUser(username, data) {
    return this.http.patch(
      `https://sons-de-ta-ville.onrender.com/users/${username}`,
      data
    );
  }

  createComment(soundId, newComment) {
    const body = { sound: soundId, comment: newComment };
    return this.http.post(
      `https://sons-de-ta-ville.onrender.com/comments`,
      body
    );
  }

  getCommentsBySoundId(soundId) {
    return this.http.get(
      `https://sons-de-ta-ville.onrender.com/comments?sound=${soundId}`
    );
  }
}
