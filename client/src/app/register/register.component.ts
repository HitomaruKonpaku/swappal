import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private location: Location) { }

    onSubmit(f: NgForm) {
        var value = f.value;
        this.userService.create(value)
            .subscribe(
            data => {
                switch (data.msg) {
                    case 'success':
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                        break;

                    // case 'duplicate':
                    //     this.alertService.error('Email duplicate');
                    //     this.loading = false;
                    //     break;
                    // case 'error':
                    //     this.alertService.error('Error');
                    //     this.loading = false;
                    //     break;

                    default: this.alertService.error(data.msg);
                        this.loading = false;
                        break;
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    goBack(): void {
        this.location.back();
    }
}
