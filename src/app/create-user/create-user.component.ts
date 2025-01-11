import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserForm: any;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  get f() {
    return this.createUserForm.controls;
  }

  createAccount() {
    this.userService.createAccount(this.createUserForm.value).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return (error);
      })
    ).subscribe((res) => {
      console.log(res);
    });
  }
}
