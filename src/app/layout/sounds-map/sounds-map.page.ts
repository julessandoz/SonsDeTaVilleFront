import { ErrorAlertService } from './../../error-alert.service';
import { LoadingController } from '@ionic/angular';
import { Sound } from './../../models/sound';
import { Category } from './../../models/category';
import {
  Component,
  importProvidersFrom,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { latLng, Map, MapOptions, Marker, tileLayer, divIcon } from 'leaflet';
import { HttpClient, HttpParams } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Geolocation } from '@capacitor/geolocation';
import { ApiCallService } from 'src/app/api-call.service';
import { SoundPageComponent } from 'src/app/sound-page/sound-page.component';

@Component({
  selector: 'app-sounds-map',
  templateUrl: './sounds-map.page.html',
  styleUrls: ['./sounds-map.page.scss'],
})
export class SoundsMapPage implements OnInit {
  mapOptions: MapOptions;
  isMapVisible: boolean = true;
  soundPageVisible: boolean = false;
  soundPageSoundId: string;
  sounds: Sound[] = [];
  soundId: string;

  filterOn: boolean = false;
  result: string;
  chosenDate: string;
  selectedDate: string;
  chosenCategory: string = null;
  categoryId: string;
  selectedDistance: number = 1;
  chosenDistance: number = 1;
  datePickerOn: boolean = false;
  selectedCategory: string = null;
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
  selectedSound: Sound;
  selectedSoundMarker: HTMLElement;
  soundReady: boolean = false;
  loader: any;
  @Output() soundIdSent = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private api: ApiCallService,
    private loadingCtrl: LoadingController,
    private errorAlert: ErrorAlertService
  ) {
    this.getUserLocation();
    this.userMarker = new Marker([0, 0], { icon: this.userIcon });
    this.api.getAllSounds().subscribe(
      (data) => {
        this.sounds = data as Sound[];
        this.sounds.forEach((sound) => {
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
            const divElement = e.sourceTarget._icon.children[0];
            this.soundMarkerClick(divElement, sound);
          });
        });
      },
      (error) => {
        this.errorAlert.displaySoundListErrorAlert(error);
      }
    );
  }

  ngOnInit() {
    // request permission to use location on iOS
    Geolocation.requestPermissions();
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

    this.api.getAllSounds().subscribe(
      (data) => {
        this.sounds = data as Sound[];
      },
      (error) => {
        this.errorAlert.displaySoundListErrorAlert(error);
      }
    );

    this.api.getAllCategories().subscribe(
      (data) => {
        this.categories = data as Category[];
      },
      (error) => {
        this.errorAlert.displayCategoryListErrorAlert(error);
      }
    );

    const now = new Date();
    const twoWeeksAgo = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 15
    );
    this.selectedDate = twoWeeksAgo.toISOString();
  }

  async confirmFilter(){
    this.mapMarkers = [];
    this.chosenCategory = this.selectedCategory;
    this.chosenDistance = this.selectedDistance * 1000;
    this.chosenDate = this.selectedDate.slice(0, 10);

    let position = await this.getUserLocation();
    let params = new HttpParams();

    params = params.set('lat', position.latitude);
    params = params.set('lng', position.longitude);
    params = params.set('rad', this.chosenDistance);


    if(this.categoryId){
      params = params.set('category', this.categoryId)
    }

    if(this.chosenDate){
      params = params.set('date', this.chosenDate)
    }

    this.api.getFilteredSounds(params)
    .subscribe((data) =>{
      console.log(data)
      this.sounds = data as Sound[]
    }, (error) => {
      this.errorAlert.displaySoundListErrorAlert(error);
    })

    this.api.getFilteredSounds(params)
      .subscribe((data) => {
        this.sounds = data as Sound[];
        this.sounds.forEach((sound) => {
          console.log(sound)
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
            this.soundMarkerClick(divElement, sound);
          });
        });
      }, (error) => {
        this.errorAlert.displaySoundListErrorAlert(error);
      })
  }

  resetActualFilter() {
    this.selectedCategory = this.chosenCategory;
    this.selectedDistance = this.chosenDistance / 1000;
    this.selectedDate = this.chosenDate;
  }

  ionViewDidEnter() {
    this.locationInterval = setInterval(() => {
      this.getUserLocation().then((coordinates) => {
        this.currentLocation = coordinates;
        this.userMarker.setLatLng([
          this.currentLocation.latitude,
          this.currentLocation.longitude,
        ]);
      });
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

  defaultFilter() {
    this.chosenCategory = null;
    this.categoryId = null;
    this.chosenDistance = 1;
    this.selectedDistance = 1;
    this.selectedCategory = null;
    this.selectedDate = new Date('2020-01-01').toISOString();
    console.log('test')

    this.api.getAllSounds()
    .subscribe((data)=>{
      this.sounds = data as Sound[]
    }), (error) => {
      this.errorAlert.displaySoundListErrorAlert(error);
    };

    this.api.getAllSounds()
      .subscribe((data) => {
        this.sounds = data as Sound[];
        this.sounds.forEach((sound) => {
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
            this.soundMarkerClick(divElement, sound);
          });
        });
      }, (error) => {
        this.errorAlert.displaySoundListErrorAlert(error);
      });
  }

  clickedCategory(category: Category) {
    const clickedElement: any = document.querySelector(`#${category.name}`);
    const allCategoryElements = document.querySelectorAll('.category-filter');
    if (this.selectedCategory !== category.name) {
      allCategoryElements.forEach((element: any) => {
        element.children[0].style.border = '';
        element.children[0].style.color = '';
        element.children[0].style.backgroundColor = '';
      });
      clickedElement.children[0].style.border = '2px solid #90323D';
      clickedElement.children[0].style.color = 'white';
      clickedElement.children[0].style.backgroundColor = '#90323D';
      this.selectedCategory = category.name;
      this.categoryId = category._id;
    } else {
      clickedElement.children[0].style.border = '';
      clickedElement.children[0].style.color = '';
      clickedElement.children[0].style.backgroundColor = '';
      this.selectedCategory = null;
      this.categoryId = null;
    }
  }

  async getUserLocation() {
    try{
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
    }catch(error){
      this.errorAlert.displayGeoLocationErrorAlert(error);
      return {latitude: 0, longitude: 0, accuracy: 0, altitude: 0, altitudeAccuracy: 0, heading: 0, speed: 0};
    }
  }

  async onMapReady(map: Map) {
    this.map = map;
    this.userMarker.addTo(map);
    this.currentLocation = await this.getUserLocation();
    map.setView(
      [this.currentLocation.latitude, this.currentLocation.longitude],
      13
    );
    this.userMarker.setLatLng([
      this.currentLocation.latitude,
      this.currentLocation.longitude,
    ]);
    setTimeout(() => map.invalidateSize(), 0);
  }

  async soundMarkerClick(markerElement: HTMLElement, sound) {
    this.loader = await this.loadingCtrl.create({
      message: 'Chargement du son...',
      duration: 20000,
      spinner: 'dots',
    });
    this.loader.present();
    this.selectedSound = sound;
    this.selectedSoundMarker = markerElement;
    if (this.isMapVisible && this.selectedSound) {
    }
    this.map.setView(
      [sound.location.coordinates[0], sound.location.coordinates[1]],
      20
    );
    markerElement.style.border = '0px';
    markerElement.style.backgroundColor = '#90323D';
    markerElement.style.color = 'white';
  }

  finishedLoading() {
    this.soundReady = true;
    this.loader.dismiss();
  }

  closeSound() {
    if (this.selectedSoundMarker && this.selectedSound) {
      this.selectedSoundMarker.style.border = '2px solid #90323D';
      this.selectedSoundMarker.style.backgroundColor = 'transparent';
      this.selectedSoundMarker.style.color = '#90323D';
      this.selectedSoundMarker = null;
      this.selectedSound = null;
      this.soundReady = false;
    }
  }

  displaySoundPage(soundId) {
    if (this.soundPageVisible) {
      this.soundPageVisible = false;
      this.soundPageSoundId = null;
    } else {
      this.soundPageVisible = true;
      this.soundPageSoundId = soundId;
    }
  }

  getSoundId(soundId) {
    console.log(soundId);
    this.soundIdSent.emit(soundId);
  }
}
