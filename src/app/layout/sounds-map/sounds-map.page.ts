import { Category } from './../../models/category';
import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { latLng, Map, MapOptions, Marker, tileLayer, divIcon } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-sounds-map',
  templateUrl: './sounds-map.page.html',
  styleUrls: ['./sounds-map.page.scss'],
})
export class SoundsMapPage implements OnInit {
  mapOptions: MapOptions;
  isMapVisible = true;
  sounds: any = [];

  filterOn: boolean = false;
  result: string;
  chosenDate: string;
  chosenCategory: string;
  chosenDistance: number = 0;
  datePickerOn: boolean = false;
  categories: Category[] = [];
  currentLocation: GeolocationCoordinates;
  locationInterval: any;
  map: Map;
  mapMarkers: Marker[] = [];
  userIcon: any = divIcon({
    className: 'userMarker',
    html: `<div style="display: flex; justify-content: center; align-items: center; height: 32px; width: 32px; background-color: #344055; border-radius: 20px; z-index: 999999;"><ion-icon name="headset" size="small" style="color: white;"></ion-icon></div>`,
    iconSize: [32, 32],
  });
  userMarker: Marker;

  constructor(private http: HttpClient) {
    this.getUserLocation();
    this.userMarker = new Marker([0, 0], { icon: this.userIcon });
    this.http
      .get(`https://sons-de-ta-ville.onrender.com/sounds/`)
      .subscribe((data) => {
        this.sounds = data;
        this.sounds.forEach((sound) => {
          console.log(sound.location.coordinates);
          const myIcon = divIcon({
            className: 'soundMarker',
            html: `<div style="display: flex; justify-content: center; align-items: center; height: 40px; width: 40px; border: 2px solid #90323D; border-radius: 20px; color: #90323D;"><ion-icon name="${sound.category.iconName}" size="large" style="color: inherit;"></ion-icon></div>`,
            iconSize: [32, 32],
          });
          const marker = new Marker(
            [sound.location.coordinates[0], sound.location.coordinates[1]],
            { icon: myIcon }
          );
          this.mapMarkers.push(marker);
          marker.on('click', (e) => {
            const divElement = e.sourceTarget._icon.children[0]
            divElement.style.border = '0px';
            divElement.style.backgroundColor = '#90323D';
            divElement.style.color= 'white';
          });
        });
      });
  }

  ngOnInit() {
    this.mapOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
        }),
      ],
      zoomControl: false,
      zoom: 13,
      center: latLng(46.879966, 6.641524),
    };

    this.http
      .get(`https://sons-de-ta-ville.onrender.com/sounds/`)
      .subscribe((data) => {
        this.sounds = data;
      });

    this.http
      .get(`https://sons-de-ta-ville.onrender.com/categories/`)
      .subscribe((data) => {
        console.log(data);
        this.categories = data as Category[];
      });

    this.chosenDate = new Date().toISOString();
  }

  ionViewDidEnter() {
    this.locationInterval = setInterval(() => {
      this.getUserLocation().then((coordinates)=>{
        this.currentLocation = coordinates;
        this.userMarker.setLatLng([this.currentLocation.latitude, this.currentLocation.longitude]);
      })
    }, 20000);
  }

  ionViewDidLeave() {
    clearInterval(this.locationInterval);
  }

  centerViewOnUser() {
    this.map.setView(
      [this.currentLocation.latitude, this.currentLocation.longitude],
      20
    );
  }

  defaultValues() {
    this.chosenCategory = null;
  }

  async getUserLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }

  async onMapReady(map: Map) {
    this.map = map;
    this.userMarker.addTo(map);
    this.currentLocation = await this.getUserLocation();
    map.setView(
      [this.currentLocation.latitude, this.currentLocation.longitude],
      13
    );
    this.userMarker.setLatLng([this.currentLocation.latitude, this.currentLocation.longitude]);
    setTimeout(() => map.invalidateSize(), 0);
  }
}
