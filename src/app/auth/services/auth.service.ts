import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { environment } from 'src/app/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public url = environment.url;
  public token: any;

  constructor(private http: HttpClient,
              private router: Router,
  ) { }

  login(email:string, password:string ) {
    return this.http.post<UserModel>(`${this.url}auth/login`, {email, password});
  }

  public saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  logout() {
    return new Promise((resolve) => {
      // Obtén el token almacenado
      const token = localStorage.getItem("ACCESS_TOKEN") || sessionStorage.getItem("token");

      // Si el token existe, agrégalo a los encabezados
      if (token) {
        const headers = new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${token}`); // Agrega el token aquí

        this.http
          .post<any>(`${this.url}auth/logout`, {}, { headers: headers }) // Pasa el objeto de encabezados
          .subscribe(
            async (res: any) => {
              if (res) {
                // Limpia el token y otros datos de sesión
                this.token = "";
                localStorage.removeItem("ACCESS_TOKEN");
                localStorage.removeItem("EXPIRES_IN");
                sessionStorage.removeItem('token');
                // Redirige al usuario a la página de inicio de sesión
                this.router.navigate(['/login']);
                resolve(true);
              }
            },
            (error) => {
              console.log(error);
              resolve(false);
            }
          );
      } else {
        // Si no hay token, resuelve directamente y redirige al usuario
        this.router.navigate(['/login']);
        resolve(false);
      }
    });
  }


}
