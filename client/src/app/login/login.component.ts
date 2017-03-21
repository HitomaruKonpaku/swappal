import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AlertService, AuthenticationService } from '../_services/index';

import { HeaderComponent } from '../_layouts/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
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
        var e = v.email;
        var p = v.pwd;

        this.loading = true;
        this.authenticationService.login(v)
            .subscribe(
            data => {
                switch (data.msg) {
                    case 'success':
                        this.alertService.success('Log in successful', true);
                        this.router.navigate([this.returnUrl]);
                        // reload page
                        location.reload();
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
