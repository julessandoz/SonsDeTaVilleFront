import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SoundPlayerComponent } from 'src/app/sound-player/sound-player.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-record-sound',
  templateUrl: './record-sound.page.html',
  styleUrls: ['./record-sound.page.scss'],
})
export class RecordSoundPage implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {
  
  }
}

