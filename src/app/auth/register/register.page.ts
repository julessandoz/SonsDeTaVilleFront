import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { RegisterRequest } from './../../models/register-request';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerRequest: RegisterRequest;

  usernameTaken: boolean;

  emailTaken: boolean;

  badPassword: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.registerRequest = {
      username: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined
    };
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(!this.checkPasswords(this.registerRequest.password, this.registerRequest.confirmPassword)) {
      return;
    }

    this.auth.register$(this.registerRequest).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        if (err.status === 409) {
          if (err.error === 'Username is already taken') {
            this.usernameTaken = true;
          } else if (err.error === 'Email is already taken') {
            this.emailTaken = true;
          }
        } else {
          if (err.error === 'Password must be 8 characters or longer') {
            this.badPassword = true;
          }
        }
        console.warn(`Registration failed: ${err.message}`);
        console.log(err.error)
      }
    });
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


}
