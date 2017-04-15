import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {CreateProfileDialogComponent} from './createprofile.component';
import { AlertService, AuthenticationService, APIService } from '../_services/index';
import {MdDialog} from '@angular/material';
import { HeaderComponent } from '../_layouts/index';



@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',

})

export class LoginComponent implements OnInit {
    model: any = {};
    profile: any = {};
    loading = false;
    returnUrl: string;
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

    onSubmit(f: NgForm) {
        var v = f.value;
        this.loading = true;
        this.authenticationService.login(v)
            .subscribe(
            data => {
                switch (data.msg) {
                    case 'success':
                      console.log(data);
                      this.profile = data.acc.profile;
                      if (!this.profile){
                        this.openDialog();
                      }
                      this.alertService.success('Log in successful', true);
                      this.router.navigate(['/']);
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
    openDialog(){
      this.dialog.open(CreateProfileDialogComponent);
    }

}
