import { Component, Input, OnInit, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sound-player',
  templateUrl: './sound-player.component.html',
  styleUrls: ['./sound-player.component.scss'],
})
export class SoundPlayerComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient) {
  }
  wavesurfer: WaveSurfer;
  isPlaying = false
  duration: number;
  @Input() category: string;
  @Input() soundId: any;
  @Input() showCategory: boolean = false;
  @Input() soundData?: any;
  audio: any;
  @Output() soundLoaded = new EventEmitter<boolean>();

  elementId: string;

  ngOnInit(){
    this.elementId = `id${this.soundId}`
  }

  ngAfterViewInit(){
    this.wavesurfer = WaveSurfer.create({
      container: `#${this.elementId}`,
      waveColor: '#040303',
      progressColor: '#90323D',
      cursorColor: '#ffffff',
      scrollParent: false,
      barWidth: 5,
      // fillParent: true,
      barHeight: 2,
    });
    if (this.soundData) {
      this.audio =  new Audio(`data:audio/wav;base64,${this.soundData}`);
      this.wavesurfer.load(this.audio.attributes.src.value);
    } else {
      this.http.get(`https://sons-de-ta-ville.onrender.com/sounds/data/${this.soundId}`, {responseType: 'text'} ).subscribe((data) => {
      this.audio =  new Audio(`data:audio/wav;base64,${data}`);
      this.wavesurfer.load(this.audio.attributes.src.value);
      }
    )
    }
    

    this.wavesurfer.on('ready', () => {
      this.soundLoaded.emit(true);
    });

    this.wavesurfer.on('finish', () => {
      this.isPlaying = this.wavesurfer.isPlaying();
    });
  }

  playPause(){
    this.wavesurfer.playPause();
    this.isPlaying = this.wavesurfer.isPlaying();
  }
}