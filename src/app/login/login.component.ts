import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  
  constructor(private fb:FormBuilder,public userSevice:UserService,
              private snackbar:MatSnackBar,private router:Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]]
    })
  }

  get f(): { [key: string]: AbstractControl}{
    return this.loginForm.controls;
  }

  login(){
    this.userSevice.getUser(this.loginForm.value.email).subscribe((res)=>{
     
      if(res.length == 0){
        this.snackbar.open('Hesap Bulunamadı','Tamam');
      }else{
        if(res[0].password === this.loginForm.value.password){
           this.userSevice.user=res[0];
           localStorage.setItem('user',JSON.stringify(res[0]));
          this.router.navigateByUrl('/home')
        }else{
          this.snackbar.open('Yanlış Şifre','Tamam');
        }
      }
    })
  }

} 
