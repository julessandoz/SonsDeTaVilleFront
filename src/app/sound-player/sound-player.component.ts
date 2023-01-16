import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-sound-player',
  templateUrl: './sound-player.component.html',
  styleUrls: ['./sound-player.component.scss'],
})
export class SoundPlayerComponent implements OnInit {

  constructor() {}
  wavesurfer: WaveSurfer;
  isPlaying = false
  duration: number;

  ngOnInit() {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#040303',
      progressColor: '#90323D',
      cursorColor: '#ffffff',
      scrollParent: true,
      barWidth: 3,
      fillParent: true,
      barHeight: 2.5,
    });

    this.wavesurfer.load('assets/Avenue des Sports 20.m4a');
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


