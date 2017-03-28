import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services/index';
import { RequestDialogComponent} from './request.component';
import {MdDialog} from '@angular/material';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    profile: any = {}
    skills: any ={}
    name: string;
    displayInformation: boolean = false;
    displayEdit: boolean = true;
    constructor(
        private profileService: APIService,
        private dialog: MdDialog
    ) { }
    ngOnInit() {

        this.profileService.getProfile("ct95server@gmail.com")
            .subscribe(
            data => {
                this.profile = data.data.profile
                console.log(this.profile)
            },
            error => {
                console.log("error")
            })
            this.profileService.getSkills("ct95server@gmail.com")
                .subscribe(
                data => {
                    this.profile = data.data.skills
                    console.log(this.skills)
                },
                error => {
                    console.log("error")
                })
    }

    openDialog(){
      this.dialog.open(RequestDialogComponent);
    }
    switchForm(){
      if (this.displayInformation == true){
        this.displayInformation = false;
        this.displayEdit = true;
      }else {
        this.displayInformation = true;
        this.displayEdit = false;
      }
    }
}
