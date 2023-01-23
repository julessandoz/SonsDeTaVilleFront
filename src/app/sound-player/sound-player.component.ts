import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { HttpClient } from '@angular/common/http';

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
  id: string = "638da12d40ae1f0493231fcc";
  sound:any;

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

    this.http.get(`https://sons-de-ta-ville.onrender.com/sounds/data/${this.id}`)
    .subscribe((data) => {
      console.log(data)
      this.sound = data;
    })
    
    this.wavesurfer.on('ready', () => {
      this.duration = Math.ceil(this.wavesurfer.getDuration());
    });

    this.wavesurfer.load('assets/Georgio - Hôtel 5 étoiles (Clip Officiel).m4a');
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

  test(){
    this.wavesurfer.load('assets/Georgio - Hôtel 5 étoiles (Clip Officiel).m4a');
  }
}