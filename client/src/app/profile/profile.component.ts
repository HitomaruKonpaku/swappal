import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services/index';
// import { RequestDialogComponent} from './request.component';
import {MdDialog} from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {SearchComponent} from '../search/index';
declare var $: any;
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
    userSkills : any ={};
    currentHave: any = [];
    requests: any = [];
    currentEmail: string;
    loading = false;
    displayInformation: boolean = false;
    displayEdit: boolean = true;
    displayButton: boolean = true;
    displayButtonEdit: boolean = true;
    currentToken: string;
    otherEmail : string;
    sfrom : string;
    sto : string;
    emailfrom: string;

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
                this.userSkills = data.data.skills
                console.log(this.userSkills)
                for (let i = 0; i < this.userSkills.have.length;i++){
                  this.currentHave[i] = this.userSkills.have[i];
                }
              },
              error=>{
                console.log("error")
              })
    }
    sendRequest(r:NgForm){
      var value = r.value;
      console.log(value);
      value.sfrom = this.sfrom
      value.sto = this.sto

      this.profileService.newRequest(value).subscribe(
        data=>{
          console.log(data)

          switch (data.msg) {
              case 'success':

                  // this.alertService.success('Registration successful', true);
                  this.requests = data.data
                  console.log(this.requests)
                  break;
              // default: this.alertService.error(data.msg);
              //     this.loading = false;
              //     break;
          }
        },
        error=>{

        }
      )

      $('#SwapModal').modal('hide');

    }
}
