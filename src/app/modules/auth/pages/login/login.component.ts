import { Usuario } from './../../interfaces/usuario';
import { AuthResponse } from './../../interfaces/authresponse';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  FrmLogin: FormGroup = this.fb.group({
    email: ['geampier.smc@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {

  }

  login() {

    this.authService.login(this.FrmLogin.value).subscribe(ok => {
      console.log(ok);
      if(ok===true){
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('Error', ok,'error')
      }
    })

    // this.authService.validarToken().subscribe(resp=>{
    //   console.log(resp);

    // })
    // this.router.navigateByUrl('/dashboard');

  }
}
