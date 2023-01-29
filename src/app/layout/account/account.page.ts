import { ErrorAlertService } from './../../error-alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { SoundPlayerComponent } from 'src/app/sound-player/sound-player.component';
import { ApiCallService } from 'src/app/api-call.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  displayParam: boolean;
  user: any;

  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  newEmail: string;

  badPassword: boolean;

  emailTaken: boolean;

  sounds: any = [];

  constructor(
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private api: ApiCallService,
    private errorAlert: ErrorAlertService
  ) {}

  ngOnInit() {
    this.auth.getUser$().subscribe((data) => {
      this.api.getUserByUsername(data.username).subscribe(
        (data) => {
          this.user = data;
          this.api.getUserSounds(this.user._id).subscribe(
            (data) => {
              this.sounds = data;
            },
            (error) => {
              this.errorAlert.displaySoundListErrorAlert(error);
            }
          );
        },
        (error) => {
          this.errorAlert.displayUserErrorAlert(error);
        }
      );
    });
  }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  checkPasswords(password1: string, password2: string) {
    if (password1 === password2) {
      if (password1.length < 8) {
        this.badPassword = true;
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  updateUser(
    username: string,
    newEmail: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    if (!this.checkPasswords(newPassword, confirmNewPassword)) {
      this.errorAlert.displayPassowrdsDontMatchErrorAlert();
      return;
    }
    const data = { email: newEmail, password: newPassword };

    this.api.updateUser(username, data).subscribe({
      error: (err) => {
        if (err.status === 400) {
          this.emailTaken = true;
        } else {
          this.badPassword = true;
        }
      },
    });

    location.reload();
  }
}
