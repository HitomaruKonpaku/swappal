import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
  profile: any ={}
  name: string;
  constructor(
    private profileService : APIService,
  ){}
  ngOnInit() {

      this.profileService.getProfile("test@gmail.com").subscribe(
      data => {
          console.log(data)
          this.profile = data
      },
      error => {
          console.log("error")
      });
  }
}
