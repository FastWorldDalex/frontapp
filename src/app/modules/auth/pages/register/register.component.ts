import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Component } from '@angular/core';
import Swal from "sweetalert2";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  FrmRegister:FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.minLength(5)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })

  constructor(private fb:FormBuilder, private router:Router,private authService:AuthService ){

  }

  register(){


    this.authService.registrarUsuario(this.FrmRegister.value).subscribe(ok => {
      console.log(ok);
      if(ok===true){
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('Error', ok,'error')
      }
    })


  }
}
