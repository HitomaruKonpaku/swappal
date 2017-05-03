import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services/index';
// import { RequestDialogComponent} from './request.component';
import {MdDialog} from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {SearchComponent} from '../search/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    show: boolean = true;
    profile: any = {};
    skills: any ={};
    skillHave: any = [];
    skillWant: any = [];
    currentEmail: string;
    loading = false;
    displayInformation: boolean = false;
    displayEdit: boolean = true;
    displayButton: boolean = true;
    displayButtonEdit: boolean = true;
    currentToken: string;
    otherEmail : string;
    constructor(
        private profileService: APIService,
        private dialog: MdDialog,
        // private router: Router,
        private activatedRoute: ActivatedRoute,
        private foundUser: SearchComponent,
    ) { }
    ngOnInit() {
      this.currentEmail = localStorage.getItem('currentEmail');
      this.currentToken = localStorage.getItem('currentToken');
      this.activatedRoute.queryParams.subscribe((params: Params) => {
              this.otherEmail = params['email'];
            });
        if (!this.otherEmail){
          this.getProfile(this.currentEmail);
          this.displayButtonEdit = false;
        }
        else{
          this.getProfile(this.otherEmail);
          this.getCurrentUserSkill(this.currentEmail);
          this.displayButton = false;
        }
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
                  break;
                    default: this.loading = false;
                    break;
              }
          },
          error => {
          });
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

    getProfile(email : any){
      this.profileService.getProfile(email)
          .subscribe(
          data => {
              this.profile = data.data.profile
          },
          error => {
              console.log("error")
          })
      this.profileService.getSkills(email)
          .subscribe(
          data => {
              this.skills = data.data.skills
              console.log(this.skills)
              for (let i = 0; i < this.skills.have.length;i++){
                this.skillHave[i] = this.skills.have[i];
              }
              for (let i = 0; i <this.skills.want.length;i++){
                this.skillWant[i] = this.skills.want[i];
              }
          },
          error => {
              console.log("error")
          })
    }
    getCurrentUserSkill(email:any){
      this.profileService.getSkills(email)
            .subscribe(
              data=>{
                console.log(data)
              },
              error=>{

              })
    }
}
