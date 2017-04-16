import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertService, AuthenticationService, APIService } from '../_services/index';
import {MdDialog} from '@angular/material';
import { HeaderComponent } from '../_layouts/index';
declare var $: any;


@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',

})

export class LoginComponent implements OnInit {
    model: any = {};
    profile: any = {};
    loading = false;
    returnUrl: string;
    email :any ;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private profileService : APIService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private dialog: MdDialog,
    ) { }

    ngOnInit() {
        // check login status
        if (this.authenticationService.status() === true) {
            this.router.navigate(['/']);
        }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    ngAfterviewInit(){

//save di doi xiu

    }
    //chay thu coi
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
      console.log (a);
      console.log (value);
      value.email = this.email;
      this.profileService.createProfile(value)
          .subscribe(
          data => {
              switch (data.msg) {
                  case 'success':
                  location.reload();
                  this.router.navigate(['/']);
                  this.alertService.success('Create profile successful', true);
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

    // openDialog(){
    //   this.dialog.open(CreateProfileDialogComponent);
    // }

}
