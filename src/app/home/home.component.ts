import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  question:string="";
  questionList :Array<any> = [];

  constructor(public questionService:QuestionService,public userservice:UserService){}

  ngOnInit(): void {
    this.questionService.getQuestion().subscribe((res)=>{
      this.questionList=res;

    })
  }
  
  post(){
    this.questionService.postQuestion({
      username:this.userservice.user.username,
      question:this.question,
      solution:[]
    }).subscribe((res)=>{
      this.questionList.push(res);
    })
  }
}
