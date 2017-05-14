import { Component, OnInit } from '@angular/core';
import { AuthenticationService, APIService,AlertService } from '../_services/index';
import {MdListModule} from '@angular/material';
import {MdDialog,MdDialogConfig, MdDialogRef} from '@angular/material';
import { NgForm } from '@angular/forms';

declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'my-app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
    isLogin: boolean;
    isRequest : boolean = false;
    currentEmail:string;
    profile: any ={};
    requests: any =[];
    request:any={};
    userSkill: any;
    otherSkill: any;
    noti:string;
    isEmail :any=[];
    isOdd : any = [];



    constructor(
        private authService: AuthenticationService,
        private apiService: APIService,
        private dialog : MdDialog,
    ) {}


    ngOnInit() {
        this.updateLoginStatus();
        this.currentEmail = localStorage.getItem('currentEmail');
        this.apiService.getProfile(this.currentEmail)
            .subscribe(
            data => {
                this.profile = data.data.profile
                console.log(this.profile)
            },
            error => {
                console.log("error")
            })
        var str = '{"email":"'+this.currentEmail+'"}'
        var json = JSON.parse(str);
        this.apiService.getRequest(json)
            .subscribe(
              data => {
                this.requests = data.data;
                console.log(this.requests)
                for (let i =0;i<this.requests.length;i++){
                  if (this.requests[i].accFrom.acc.email == this.currentEmail){
                    this.isEmail[i] = false;
                  } else if (this.requests[i].accTo.acc.email == this.currentEmail){
                    this.isEmail[i]= true;
                  }
                }
                console.log(this.isEmail)
              },
              error => {

              }
            )
    }

    updateLoginStatus() {
        this.isLogin = this.authService.status();
    }
    openDialog(request: any){
      let config = new MdDialogConfig();
      let dialogRef:MdDialogRef<ExchangeDialog> = this.dialog.open(ExchangeDialog,config);
      dialogRef.componentInstance.request = request;
      dialogRef.componentInstance.isEmail = this.isEmail;
    }
}
@Component({
  moduleId: module.id,
  selector: 'exchange-dialog',
  templateUrl: 'exchange.component.html',
})
export class ExchangeDialog implements OnInit {
  request: any;
  currentEmail : string;
  currentToken: string;
  isEmail : any=[];
  isAccept : boolean;
  constructor(
    public dialogRef: MdDialogRef<ExchangeDialog>,
    private apiService :  APIService,
    private alertService : AlertService,

  ){}

  ngOnInit(){
    this.currentEmail = localStorage.getItem('currentEmail');
    this.currentToken = localStorage.getItem('currentUser.token');
    console.log(this.isEmail)
  }

  replyRequest(r:NgForm){
    var value = r.value;
    console.log(value)

    this.apiService.replyRequest(value)
    .subscribe(
      data=>{
        console.log(data)

        switch (data.msg) {
            case 'success':




            break;
            // default: this.alertService.error(data.msg);
            //     this.loading = false;
            //     break;
        }
      },
      error=>{

      }
    )
  }
  acceptRequest(requestid: any, from : any){
    var str = '{"requestid":"'+requestid+'"'+',"from":"'+from+'"}'
    var json = JSON.parse(str)

    this.apiService.acceptRequest(json).subscribe(
      data=>{
        console.log(data)

        switch (data.msg) {
            case 'success':
            this.alertService.success('Bạn đã chấp nhận trao đổi', true);
            this.isAccept = true;
            break;
        }
      },
      error=>{

      }
    )
  }
  declineRequest(requestid: any, from : any){
    var str = '{"requestid":"'+requestid+'"'+',"from":"'+from+'"}'
    var json = JSON.parse(str)

    this.apiService.declineRequest(json).subscribe(
      data=>{
        switch (data.msg) {
            case 'success':

                break;

        }
      },
      error=>{

      }
    )
  }



}
