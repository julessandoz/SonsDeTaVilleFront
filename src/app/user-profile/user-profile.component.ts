import { Sound } from './../models/sound';
import { User } from './../models/user';
import { ErrorAlertService } from './../error-alert.service';
import { ApiCallService } from 'src/app/api-call.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private api: ApiCallService,
    private errorAlert: ErrorAlertService,
    private auth:AuthService
  ) {}

  @Input() userId: string;
  @Input() showCloseBtn: boolean = true;
  @Output() closeUserProfile = new EventEmitter<boolean>();
  user: User;
  sounds: Sound[] = [];
  soundPageVisible: boolean = false;
  soundPageSoundId: string;
  loggedUser: any;

  ngOnInit() {
    console.log('user profile component init')
    this.auth.getUser$().subscribe(data =>{
      this.loggedUser = data as User;
    })
    this.api.getUserById(this.userId).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        this.errorAlert.displayUserErrorAlert(error);
      }
    );
    this.api.getUserSounds(this.userId).subscribe(
      (sounds: Sound[]) => {
        this.sounds = sounds;
      },
      (error) => {
        this.errorAlert.displaySoundListErrorAlert(error);
      }
    );
  }

  displaySoundPage(soundId) {
    if (this.soundPageVisible) {
      this.soundPageVisible = false;
      this.soundPageSoundId = null;
    } else {
      this.soundPageSoundId = soundId;
      this.soundPageVisible = true;
    }
  }

  closeProfile() {
    this.closeUserProfile.emit(true);
  }

}
