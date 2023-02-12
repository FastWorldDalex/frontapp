import { AuthService } from './../../../auth/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  get usuario(){
    return this.authService.usuario;
  }

  constructor(private router:Router,
    private authService:AuthService){

  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/auth')
    //sessionStorage.removeItem('token');
  }
}
