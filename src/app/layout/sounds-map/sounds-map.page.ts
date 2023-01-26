import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { latLng, Map, MapOptions, Marker, tileLayer, divIcon} from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from 'src/app/filter/filter.component';
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
  currentLocation: GeolocationCoordinates;
  map: Map;
  mapMarkers: Marker[] = [];

  constructor(private http: HttpClient, private modalCtrl: ModalController ) {
    this.getUserLocation();
    this.http.get(`https://sons-de-ta-ville.onrender.com/sounds/`)
    .subscribe((data) => {
      this.sounds = data;
      this.sounds.forEach(sound => {
        console.log(sound.location.coordinates)
        const myIcon = divIcon({
          html: `<div><ion-icon name="${sound.category.iconName}" size="large"></ion-icon></div>`,
          iconSize: [32, 32],
      });
        this.mapMarkers.push(
          new Marker([sound.location.coordinates[0], sound.location.coordinates[1]], {icon: myIcon })
        );
      });
    })
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
  }

  async openOverlay() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent
    });
    await modal.present();
  }

  async getUserLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }

  async onMapReady(map: Map) {
    this.map = map;
    this.currentLocation = await this.getUserLocation();
    map.setView([this.currentLocation.latitude, this.currentLocation.longitude], 13);
    setTimeout(() => map.invalidateSize(), 0);
  }
}
