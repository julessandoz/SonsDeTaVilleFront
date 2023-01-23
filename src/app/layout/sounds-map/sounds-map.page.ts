import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-sounds-map',
  templateUrl: './sounds-map.page.html',
  styleUrls: ['./sounds-map.page.scss'],
})

export class SoundsMapPage implements OnInit {
  mapOptions: MapOptions;
  isMapVisible = true;
  sounds: any = [];

  constructor(private http: HttpClient) {
    this.mapOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
        }),
      ],
      zoom: 13,
      center: latLng(46.879966, 6.641524),
    };
  }

  ngOnInit() {
    this.http.get(`https://sons-de-ta-ville.onrender.com/sounds/`)
    .subscribe((data) => {
      console.log(data)
      this.sounds = data;
    })
  }
}
