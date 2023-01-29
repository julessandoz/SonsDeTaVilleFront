import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() soundId: string;
  @Output() displaySoundPage = new EventEmitter<boolean>();

  constructor(private auth: AuthService, private api:ApiCallService) { }


  

  ngOnInit() {
    this.api.getSoundById(this.soundId)
    .subscribe(data =>{
      this.sound = data as Sound
    })

    this.auth.getUser$()
    .subscribe(data =>{
      this.user = data;
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

  closeSoundPage(){
    this.displaySoundPage.emit()
  }
}
