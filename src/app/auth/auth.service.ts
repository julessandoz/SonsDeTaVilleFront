import { ErrorAlertService } from './../error-alert.service';
import { RegisterRequest } from './../models/register-request';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject, Observable, from } from "rxjs";
import { catchError, delayWhen, map } from "rxjs/operators";
import { Storage } from "@ionic/storage";

import { AuthResponse } from "../models/auth-response";
import { User } from "../models/user";
import { AuthRequest } from "../models/auth-request";
import { environment } from "src/environments/environment";
import { RegisterResponse } from '../models/register-response';

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private storage: Storage, private errorAlert: ErrorAlertService) {
    this.#auth$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.#auth$.next(auth);
    });
  }

  private saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }

  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  getUser$(): Observable<User> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  getUserName$(): Observable<String> {
    return this.#auth$.pipe(map((auth) => auth?.user.username));
  }

  getToken$(): Observable<string> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${environment.apiUrl}/auth/login`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => this.saveAuth$(auth)),
      map((auth) => {
        this.#auth$.next(auth);
        console.log(`User ${auth.user.email} logged in`);
        return auth.user;
      }),
      catchError((error) => {
        this.errorAlert.displayUserLoginErrorAlert(error);
        throw error;
      })
    );
  }

  register$(registerRequest: RegisterRequest): Observable<any> {
    const registerUrl = `${environment.apiUrl}/users`;
    return this.http.post<RegisterResponse>(registerUrl, registerRequest).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        this.errorAlert.displayUserRegistrationErrorAlert(error);
        throw error;
      })
    );
  }
  logOut(): void {
    this.#auth$.next(null);

    this.storage.remove('auth');
    console.log('User logged out');
    location.reload();
  }
}
