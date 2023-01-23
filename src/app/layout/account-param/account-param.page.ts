import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-param',
  templateUrl: './account-param.page.html',
  styleUrls: ['./account-param.page.scss'],
})
export class AccountParamPage implements OnInit {

  user: any;

  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  newEmail: string;

  badPassword: boolean;

  emailTaken: boolean;


  constructor(
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.auth.getUser$().subscribe(data => {
      this.http.get(`https://sons-de-ta-ville.onrender.com/users/${data.username}`).subscribe(data => {
        console.log(data)
        this.user = data;
      })
    })
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

  updateUser(username: string, newEmail: string, newPassword: string, confirmNewPassword: string) {

    const data = { email: this.newEmail, password: this.newPassword };

      this.http.patch(`https://sons-de-ta-ville.onrender.com/users/${username}`, data)
      .subscribe({
        next: () => this.router.navigateByUrl('account-param'),
      error: (err) => {
        if (err.status === 400) {
            this.emailTaken = true;
        } else {
            this.badPassword = true;
        }
        console.warn(`Registration failed: ${err.message}`);
        console.log(err.error)
      }
      });

  }

}
