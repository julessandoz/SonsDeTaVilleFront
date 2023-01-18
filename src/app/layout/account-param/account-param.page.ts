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

  currentPwd: String;
  newPwd: String;
  newEmail: String;
  validNewPwd: String;

  user: any;

  constructor(
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.auth.getUser$().subscribe(data => {
      this.http.get(`https://sons-de-ta-ville.onrender.com/users/${data.username}`).subscribe(data => {
        console.log(data)
        this.user = data;
      })
    })
  }

  updateUser(username: String, newEmail: String){

    const email = newEmail;
    const data = { email: email };

    this.http.patch(`https://sons-de-ta-ville.onrender.com/users/${username}`, data)
    .subscribe((response) => {
      console.log(response);
    });
  }

}
