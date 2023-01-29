import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SoundPlayerComponent } from '../sound-player/sound-player.component';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiCallService } from '../api-call.service';
import { User } from '../models/user';
import { Sound } from '../models/sound';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-sound-page',
  templateUrl: './sound-page.component.html',
  styleUrls: ['./sound-page.component.scss'],
})
export class SoundPageComponent implements OnInit {

  sound:Sound;
  user: User
  newComment: string;
  recievedSoundId: string = '638da12d40ae1f0493231fcc';
  @Output() displaySoundPage = new EventEmitter<boolean>();

  constructor(private auth: AuthService, private api:ApiCallService) { }




  ngOnInit() {

    this.api.getSoundById(this.recievedSoundId)
    .subscribe(data =>{
      this.sound = data as Sound
    })

    this.auth.getUser$()
    .subscribe(data =>{
      this.user = data;
    })

  }

  ngOnChanges(){
    this.api.getSoundById(this.recievedSoundId)
    .subscribe(data =>{
      this.sound = data as Sound
    })
  }

  createComment(soundId, newComment){
    this.api.createComment(soundId,newComment)
    .subscribe({
      error: (err)=>{
        console.log(err)
      }
    })
    this.newComment = null;
  }

  getSoundId(soundId){
    this.recievedSoundId  = soundId;
    console.log(soundId)
  }

  closeSoundPage(){
    this.displaySoundPage.emit()
  }
}
