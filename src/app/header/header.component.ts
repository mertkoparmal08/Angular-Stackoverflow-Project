import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(public userservice:UserService,private router:Router){}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage){
    
      let str = localStorage.getItem('user');
      if(str !=null){
        this.userservice.user =JSON.parse(str);
      }else{
        this.router.navigateByUrl('/login');
      }
    }
  }

  logout(){
    this.userservice.user =undefined;
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
