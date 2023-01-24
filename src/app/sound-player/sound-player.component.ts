import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sound-player',
  templateUrl: './sound-player.component.html',
  styleUrls: ['./sound-player.component.scss'],
})
export class SoundPlayerComponent implements OnInit {

  constructor(private http: HttpClient) {}
  wavesurfer: WaveSurfer;
  isPlaying = false
  duration: number;
  category: string = "Personnes";
  @Input() soundId: any;
  @Input() showCategory: boolean = false;

  ngOnInit(){
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#040303',
      progressColor: '#90323D',
      cursorColor: '#ffffff',
      // scrollParent: true,
      barWidth: 3,
      // fillParent: true,
      barHeight: 2.5,
    });
    this.wavesurfer.load(`https://sons-de-ta-ville.onrender.com/sounds/data/${this.soundId}`);

    this.wavesurfer.on('ready', () => {
      this.duration = Math.ceil(this.wavesurfer.getDuration());
    });

    this.wavesurfer.on('finish', () => {
      this.isPlaying = this.wavesurfer.isPlaying();
      console.log(this.isPlaying)
    });
  }

  playPause(){
    this.wavesurfer.playPause();
    this.isPlaying = this.wavesurfer.isPlaying();
    console.log(typeof this.wavesurfer.getDuration())
  }
}