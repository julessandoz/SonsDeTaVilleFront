import { ApiCallService } from 'src/app/api-call.service';
import { ErrorAlertService } from './../../error-alert.service';
import { Category } from './../../models/category';
import { HttpClient } from '@angular/common/http';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-record-sound',
  templateUrl: './record-sound.page.html',
  styleUrls: ['./record-sound.page.scss'],
})
export class RecordSoundPage implements OnInit {
  constructor(
    private api: ApiCallService,
    private alertController: AlertController,
    private errorAlert: ErrorAlertService
  ) {}

  recordedSound: boolean = false;
  soundFilePath: any;
  soundFile: File;
  soundFileBase64: any;
  categoriesArray: any[] = [];
  rows: any[] = [];
  selectedCategory: Category;

  ngOnInit() {
    this.api.getAllCategories().subscribe(
      (data) => {
        this.categoriesArray = data as Category[];
        const amountOfRows: number = Math.ceil(this.categoriesArray.length / 3);
        this.rows = Array.from(Array(amountOfRows).keys());
      },
      (error) => {
        this.errorAlert.displayCategoryListErrorAlert(error);
      }
    );
  }

  async soundRecorded(fileName: string) {
    const contents: any = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Data,
    });
    this.soundFilePath = fileName;
    this.soundFile = new File([contents.data], fileName, { type: 'audio/wav' });
    this.soundFileBase64 = contents.data;
    this.recordedSound = true;
  }

  async playAudio() {
    const audio = await Filesystem.readFile({
      path: this.soundFilePath,
      directory: Directory.Data,
    });
    const base64Data = audio.data;
    const audioRef = new Audio(`data:audio/wav;base64,${base64Data}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }

  clickCategory(category) {
    this.selectedCategory = category;
    this.presentPostAlert();
  }

  async presentDeleteAlert() {
    const alert = await this.alertController.create({
      header: 'Veux-tu vraiment supprimer ce son ?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Annuler',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Confirmer',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteSound();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentPostAlert() {
    const alert = await this.alertController.create({
      header: `Veux-tu publier ce son avec la catégorie: "${this.selectedCategory.name}"?`,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Annuler',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Publier',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.postSound();
          },
        },
      ],
    });

    await alert.present();
  }

  deleteSound() {
    Filesystem.deleteFile({
      path: this.soundFilePath,
      directory: Directory.Data,
    });
    this.recordedSound = false;
  }

  async postSound() {
    const audioFile = new File([this.soundFile], this.soundFile.name, {
      type: 'audio/webm; codecs-opus',
    });
    try{
      const location = await Geolocation.getCurrentPosition();
      this.api
      .createSound(audioFile, this.selectedCategory.name, location.coords)
      .subscribe(
        (data) => {
          this.deleteSound();
        },
        (error) => {
          this.errorAlert.displaySoundCreationErrorAlert(error);
        }
      );
    } catch (error) {
      this.errorAlert.displayGeoLocationErrorAlert(error);
    }
  }
}
