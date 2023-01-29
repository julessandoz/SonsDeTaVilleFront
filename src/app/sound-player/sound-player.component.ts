import { ErrorAlertService } from './../error-alert.service';
import { ApiCallService } from 'src/app/api-call.service';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sound-player',
  templateUrl: './sound-player.component.html',
  styleUrls: ['./sound-player.component.scss'],
})
export class SoundPlayerComponent implements OnInit, AfterViewInit {
  constructor(
    private api: ApiCallService,
    private errorAlert: ErrorAlertService,
    private alertCtrl: AlertController
  ) {}
  wavesurfer: WaveSurfer;
  isPlaying = false;
  duration: number;
  @Input() category: string;
  @Input() soundId: any;
  @Input() showCategory: boolean = false;
  @Input() soundData?: any;
  @Input() showCommentBtn: boolean = true;
  @Input() showDeleteBtn: boolean = true;
  audio: any;
  @Output() soundLoaded = new EventEmitter<boolean>();
  @Output() soundIdSent = new EventEmitter<string>();
  @Output() displaySoundPage = new EventEmitter<string>();

  elementId: string;

  ngOnInit() {
    this.elementId = `id${this.soundId}`;
  }

  ngAfterViewInit() {
    this.wavesurfer = WaveSurfer.create({
      container: `#${this.elementId}`,
      waveColor: '#040303',
      progressColor: '#90323D',
      cursorColor: 'transparent',
      scrollParent: false,
      barWidth: 2,
      // fillParent: true,
      barHeight: 0.75,
    });
    if (this.soundData) {
      this.audio = new Audio(`data:audio/wav;base64,${this.soundData}`);
      this.wavesurfer.load(this.audio.attributes.src.value);
    } else {
      this.api.getSoundDataById(this.soundId).subscribe(
        (data) => {
          this.audio = new Audio(`data:audio/wav;base64,${data}`);
          this.wavesurfer.load(this.audio.attributes.src.value);
        },
        (error) => {
          this.errorAlert.displaySoundDataErrorAlert(error);
        }
      );
    }

    this.wavesurfer.on('ready', () => {
      this.soundLoaded.emit(true);
    });

    this.wavesurfer.on('finish', () => {
      this.isPlaying = this.wavesurfer.isPlaying();
    });
  }

  playPause() {
    this.wavesurfer.playPause();
    this.isPlaying = this.wavesurfer.isPlaying();
  }

  openSoundPage(soundId: string) {
    this.displaySoundPage.emit(soundId);
  }

  deleteSound() {
    this.api.deleteSound(this.soundId).subscribe((data) => {
      console.log(data);
    });
  }

  async presentDeleteConfirmation() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer ce son?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirmation annulée');
          },
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.api.deleteSound(this.soundId).subscribe((data) => {
              console.log(data);
            });
            console.log('Son supprimé');
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
        },
      ],
    });

    await alert.present();
  }
}
