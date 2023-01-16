import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user : any;

  constructor(
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
this.auth.getUser$().subscribe(data=>{this.http.get(`https://sons-de-ta-ville.onrender.com/users/${data.username}`).subscribe(data => {
  console.log(data)
  this.user = data;
})
})
  }



  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
}
