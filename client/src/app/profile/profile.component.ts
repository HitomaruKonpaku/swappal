import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services/index';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {SearchComponent} from '../search/index';
import {HeaderComponent} from '../_layouts/index';
declare var $: any;
@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html',
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
    isAccept: boolean;
    isEmail: boolean;
    isRequest: boolean = false;
    isProgress : boolean =false;
    isOtherRequest: boolean = false;
    requestList: any=[];
    SkillCount: any;
    ServiceCount: any;
    requestID: any;

    constructor(
        private apiService: APIService,
        private activatedRoute: ActivatedRoute,
        private foundUser: SearchComponent,
        private header : HeaderComponent,
    ) { }
    ngOnInit() {
      this.currentEmail = localStorage.getItem('currentEmail');
      this.currentToken = localStorage.getItem('currentToken');
      this.requestList = JSON.parse(sessionStorage.getItem('dataRequests'));
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
        console.log(this.requestList)
        this.userCheck(this.currentEmail,this.otherEmail);
    }

    onSubmit(f:NgForm){
      var value = f.value;
      value.email = localStorage.getItem('currentEmail');
      this.apiService.createProfile(value)
          .subscribe(
          data => {
              switch (data.msg) {
                  case 'success':
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
      this.apiService.getProfile(email)
          .subscribe(
          data => {
              this.profile = data.data.profile
          })
      this.apiService.getSkills(email)
          .subscribe(
          data => {
              this.skills = data.data.skills
              for (let i = 0; i < this.skills.have.length;i++){
                this.skillHave[i] = this.skills.have[i];
              }
              for (let i = 0; i <this.skills.want.length;i++){
                this.skillWant[i] = this.skills.want[i];
              }
          })
    }
    getCurrentUserSkill(email:any){
      this.apiService.getSkills(email)
            .subscribe(
              data=>{
                this.userSkills = data.data.skills
                console.log(this.userSkills)
                for (let i = 0; i < this.userSkills.have.length;i++){
                  this.currentHave[i] = this.userSkills.have[i];
                }
              })
    }
    sendRequest(r:NgForm){
      var value = r.value;
      console.log(value);
      value.sfrom = this.sfrom
      value.sto = this.sto

      this.apiService.newRequest(value).subscribe(
        data=>{
          console.log(data)

          switch (data.msg) {
              case 'success':
                this.isRequest = true;
                break;
          }
        },
        error=>{

        }
      )
      $('#SwapModal').modal('hide');

    }
    writeReview(rating: NgForm){
      // console.log(rating)
      var value = rating.value;
      value.token = this.currentToken;
      value.email = this.currentEmail;
      value.requestid = "59255dedc125b80c6e0e8400";
      console.log(value)
      this.apiService.writeReview(value).subscribe(
        data=>{
          console.log(data)
        },
        error=>{
          console.log(error)
        }
      )
    }
    userCheck(current: any, other:any){
      for (let i =0; i < this.requestList.length;i++){
        if(this.requestList[i].accFrom.acc.email == current && this.requestList[i].accTo.acc.email == other )
        {
          this.isRequest = true;

          if (this.requestList[i].status)
          {
            if (this.requestList[i].status.accept.from && this.requestList[i].status.accept.to)
            {
              this.isProgress = true;
              this.requestID = this.requestList[i]._id
            }

          }else
          {
            return
          }
        } else if(this.requestList[i].accFrom.acc.email == other && this.requestList[i].accTo.acc.email == current )
        {
          this.isOtherRequest = true;
          if (this.requestList[i].status)
          {
            if (this.requestList[i].status.accept.from && this.requestList[i].status.accept.to)
            {
              this.isProgress = true;
              this.requestID = this.requestList[i]._id
            }
          }else
          {
            return
          }
        }
      }
    }

}
