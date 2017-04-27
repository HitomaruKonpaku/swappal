import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertService, AuthenticationService, APIService } from '../_services/index';
import {MdDialog} from '@angular/material';
import { HeaderComponent } from '../_layouts/index';
import { AuthService } from 'angular2-social-login';
declare var $: any;


@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',

})

export class LoginComponent implements OnInit, OnDestroy {
    model: any = {};
    profile: any = {};
    loading = false;
    returnUrl: string;
    email :any ;
    user : any;
    sub : any;
    // public user;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private profileService : APIService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private dialog: MdDialog,
        private _auth: AuthService,
    ) { }

    ngOnInit() {
        // check login status
        if (this.authenticationService.status() === true) {
            this.router.navigate(['/']);
        }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    onSubmit(f: NgForm) {
        var v = f.value;
        this.loading = true;
        this.authenticationService.login(v)
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

      // this.profileService.createProfile(value)
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
  //   public user;
  // sub: any;
  //
  signIn(provider : any){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log(data);this.user=data;

      },
      (error)=>{

      }
    )
  }
  //
  // logout(){
  //   this._auth.logout().subscribe(
  //     (data)=>{console.log(data);this.user=null;}
  //   )
  // }
  //
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
