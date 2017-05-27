import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  skillList: any =[];
  userList: any =[];
  constructor(
    private apiService : APIService
  ){}
  ngOnInit(){
    this.getAllSkill()
    this.getAllUser()

  }
  getAllSkill(){
    this.apiService.getAllSkill().subscribe(
      data=>{
        this.skillList = data.data.docs
      }
    )
  }
  getAllUser(){
    this.apiService.getUserList().subscribe(
      data=>{
        this.userList = data.result
      }
    )
  }
  type = 'line';
  UserData = {
    labels: ["January", "February", "March", "April", "May", "June", "July","August","Sep"],
    datasets: [
      {
        label: "USER",
        data: [65, 59, 80, 81, 56, 55, 0,40],
        backgroundColor:[
          'rgba(239, 104, 99, 0.7)',
        ],
      }
    ]
  };
  FeedbackData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "FEEDBACK",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor:[
          'rgba(208, 168, 224, 0.7)',
        ],
      }
    ]
  };
  SkillData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "SKILL",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor:[
          'rgba(162, 210, 0, 0.7)',
        ],
      }
    ]
  };
  RequestData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "REQUEST",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor:[
          'rgba(34, 190, 239, 0.7)',
        ],
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

}
