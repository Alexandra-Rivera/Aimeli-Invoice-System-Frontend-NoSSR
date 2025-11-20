import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Login } from '../../interfaces/auth/login';
import { Registro } from '../../interfaces/auth/registro';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private server_url = environment.API_URL;
  private authTokenKey = 'jwt_token'; // Clave para almacenar el token en localStorage

  // Determina si el usuario está autenticado
  private _isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

   get isAuthenticated() {
    return this._isAuthenticated.asObservable();
  }

  login(login_info: Login): Observable<any> {
    return this.http.post(`${this.server_url}/auth/login`, login_info).pipe(
      tap((response: any) => {
        if (response && response.token) {
            this.setToken(response.token);
            this._isAuthenticated.next(true);
            this.router.navigate(['/home']);
        }
      })
    );
  }

  logout(): void {
    this.removeToken();
    this._isAuthenticated.next(false);
    this.router.navigate(['/inicio']);
  }

  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.authTokenKey);
  }

  registro(registro_info: Registro) {
    return this.http.post(`${this.server_url}/auth/registro`, registro_info);
  }
}
