import { ErrorAlertService } from './../error-alert.service';
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
  sound: Sound;
  user: User;
  newComment: string;
  @Input() soundId: string;
  @Output() displaySoundPage = new EventEmitter<boolean>();
  showUserProfile: boolean = false;
  userId: string;

  constructor(
    private auth: AuthService,
    private api: ApiCallService,
    private errorAlert: ErrorAlertService
  ) {}

  ngOnInit() {
    this.api.getSoundById(this.soundId).subscribe(
      (data) => {
        this.sound = data as Sound;
      },
      (error) => {
        this.errorAlert.displaySoundErrorAlert(error);
      }
    );

    this.auth.getUser$().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        this.errorAlert.displayUserErrorAlert(error);
      }
    );
  }

  createComment(soundId, newComment) {
    this.api.createComment(soundId, newComment).subscribe({
      error: (err) => {
        this.errorAlert.displayCommentCreationErrorAlert(err);
      },
    });
    this.newComment = null;
  }

  closeSoundPage() {
    this.displaySoundPage.emit();
  }

  openAuthorProfile(author: any) {
    this.userId = author._id
    this.showUserProfile = true;
  }

  closeUserProfile() {
    this.showUserProfile = false;
    this.userId = null;
  }
}
