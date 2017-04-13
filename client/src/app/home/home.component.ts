import { Component, OnInit} from '@angular/core';
import { APIService } from '../_services/index';
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  profile : any = {}
  constructor(
    private profileService : APIService,
  ){}
  ngOnInit(){
    this.profileService.getProfile("ct95server@gmail.com")
        .subscribe(
        data => {
            this.profile = data.data.profile
        },
        error => {
            console.log("error")
        })
  }
  clickonUser(){

  }
}
