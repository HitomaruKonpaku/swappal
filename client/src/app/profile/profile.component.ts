import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services/index';
import { RequestDialogComponent} from './request.component';
import {MdDialog} from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    profile: any = {}
    skills: any ={}
    email: string;
    loading = false;
    displayInformation: boolean = false;
    displayEdit: boolean = true;
    constructor(
        private profileService: APIService,
        private dialog: MdDialog,
        private router: Router
    ) { }
    ngOnInit() {
        this.email = localStorage.getItem('currentEmail');
        this.profileService.getProfile(this.email)
            .subscribe(
            data => {
                this.profile = data.data.profile
                console.log(this.profile)
            },
            error => {
                console.log("error")
            })
            this.profileService.getSkills(this.email)
                .subscribe(
                data => {
                    this.skills = data.data.skills
                    console.log(this.skills)
                },
                error => {
                    console.log("error")
                })
    }
    onSubmit(f:NgForm){
      var value = f.value;
      console.log (f);
      console.log (value);
      value.email = localStorage.getItem('currentEmail');
      this.profileService.createProfile(value)
          .subscribe(
          data => {
              switch (data.msg) {
                  case 'success':
                  console.log("success");

                  this.router.navigate['/']
                  break;
                    default: this.loading = false;
                    break;
              }
          },
          error => {
              // this.alertService.error(error);
              // this.loading = false;
          });
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
