import { AuthResponse } from './../interfaces/authresponse';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { catchError, map, of, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }
  constructor(private http: HttpClient) { }

  login(usuario: Usuario) {
    const url: string = `${this.baseUrl}auth`;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.post<AuthResponse>(url, usuario, httpOptions)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            sessionStorage.setItem('token', resp.token!);
            this._usuario = {
              id: resp.id!,
              name: resp.name!,
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  validarToken(): Observable<boolean> {
    const url: string = `${this.baseUrl}auth/renew`;
    const httpOptions = { headers: new HttpHeaders({ 'x-token': sessionStorage.getItem('token')! || '' }) };

    return this.http.get<AuthResponse>(url, httpOptions).pipe(
      map(m => {
        sessionStorage.setItem('token', m.token!);
        console.log(m.token);

        this._usuario = {
          id: m.id!,
          name: m.name!,
        }
        return m.ok;
      }), catchError(err => of(false))
    );
  }

  registrarUsuario(usuario:Usuario){
    const url: string = `${this.baseUrl}auth/new`;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    console.log(usuario);

    return this.http.post<AuthResponse>(url, usuario)
      .pipe(
        tap(resp => {
          console.log(resp);

          if (resp.ok) {
            sessionStorage.setItem('token', resp.token!);
            this._usuario = {
              id: resp.id!,
              name: resp.name!,
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }
  /*  login(
    data: FormData
  ): Observable<AuthResponse> {
    const response: AuthResponse = {
      ok: false,
      msg: '',
      token: ''
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/
  /**',
  'Content-Type': 'application/json'
})
};
return this.http.post<AuthResponse>('localhost:4100/api/auth', data, httpOptions)
.pipe(
  map(r => {

    response.ok = r.ok;
    response.msg = r.msg;
    response.token = r.token;
    //this.setUserToLocalStorage(r.data);
    console.log("ERROR", r);

    if (response.ok) {
      sessionStorage.setItem("access_token", JSON.stringify(r.token));
      this.router.navigateByUrl('/dashboard');
      console.log("entro", r.token);

    }
    return response;
  })
);
}*/
}
