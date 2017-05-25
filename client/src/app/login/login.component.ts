import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertService, AuthenticationService, APIService, ValidationService } from '../_services/index';
import {MdDialog} from '@angular/material';
import { AuthService } from 'angular2-social-login';
declare var $: any;


@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',

})

export class LoginComponent implements OnInit{
    model: any = {};
    profile: any = {};
    loading = false;
    returnUrl: string;
    email :any ;
    user : any;
    sub : any;
    mailCheck: boolean = false;
    passwordCheck: boolean = false;
    // public user;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService : APIService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private dialog: MdDialog,
        private _auth: AuthService,
        private validation: ValidationService,
    ) { }

    ngOnInit() {

        if (this.authenticationService.status() === true) {
            this.router.navigate(['/']);
        }


        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    onSubmit(f: NgForm) {
        var v = f.value;
        console.log(v)
        this.loading = true;
        this.mailCheck = this.validation.EmailValidation(v.email);
        this.passwordCheck = this.validation.PasswordValidation(v.pwd);
        if (this.mailCheck == false){
          this.alertService.error('Xin nhập lại Email')
        }else if (this.passwordCheck == false){
          this.alertService.error('Mật khẩu phải có 8 kí tự trở lên')
        }else{
          this.authenticationService.login(v)
              .subscribe(
              data => {
                  switch (data.msg) {
                      case 'success':
                        this.profile = data.acc.profile;
                        if (!this.profile){
                          $('#CreateProfileModal').modal('show');
                          $('#CreateProfileModal').modal({backdrop: 'static', keyboard: false});
                          this.email = localStorage.getItem('currentEmail');
                        }
                        else{
                          location.reload();
                          this.router.navigate(['/']);
                        }
                        this.alertService.success('Log in successful', true);

                          break;
                      default:
                          this.alertService.error(data.msg);
                          this.loading = false;
                  }
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
        }



    }
    SocialLogin(email:any, userid : any){
      var str = '{"email":"'+email+'","pwd":"'+userid+'"}'
      var json = JSON.parse(str);
      console.log(json)
      this.apiService.create(json)
      this.authenticationService.login(json)
      .subscribe(
      data => {
          switch (data.msg) {
              case 'success':
                this.profile = data.acc.profile;
                if (!this.profile){
                  $('#CreateProfileModal').modal('show');
                  this.email = localStorage.getItem('currentEmail');
                }
                else{
                  location.reload();
                  this.router.navigate(['/']);
                }
                this.alertService.success('Log in successful', true);

                  break;
              default:
                  this.alertService.error(data.msg);
                  this.loading = false;
          }
      },
      error => {
          this.alertService.error(error);
          this.loading = false;
      });
    }
    onCreateProfile(a:NgForm){
      var value = a.value;
      console.log (value);
      value.email = this.email;

      // this.apiService.createProfile(value)
      //     .subscribe(
      //     data => {
      //         switch (data.msg) {
      //             case 'success':
      //             location.reload();
      //             this.router.navigate(['/']);
      //             this.alertService.success('Create profile successful', true);
      //             break;
      //               default: this.loading = false;
      //               break;
      //         }
      //     },
      //     error => {
      //         // this.alertService.error(error);
      //         // this.loading = false;
      //     });
    }
  signIn(provider : any){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log(data);this.user=data;
        this.SocialLogin(this.user.email,this.user.uid);
      },
      (error)=>{

      }
    )
  }


}
