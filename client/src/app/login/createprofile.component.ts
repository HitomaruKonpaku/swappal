import {Component} from '@angular/core';
import {MdDialog} from '@angular/material';
import { APIService } from '../_services/index';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
    moduleId: module.id,
  selector: 'dialog-overview-example-dialog',
  templateUrl: './createprofile.component.html',
})
export class CreateProfileDialogComponent {
  model: any = {};
  loading = false;

  constructor(
      private router: Router,
      private apiService: APIService,
      private location: Location) { }

  onSubmit(f: NgForm) {
      var value = f.value;
      this.apiService.createProfile(value)
          .subscribe(
          data => {
              switch (data.msg) {
                  case 'success':
                  //     this.alertService.success('Registration successful', true);
                  //     this.router.navigate(['/login']);
                  //     break;
                  //
                  // // case 'duplicate':
                  // //     this.alertService.error('Email duplicate');
                  // //     this.loading = false;
                  // //     break;
                  // // case 'error':
                  // //     this.alertService.error('Error');
                  // //     this.loading = false;
                  // //     break;
                  //
                  // default: this.alertService.error(data.msg);
                  //     this.loading = false;
                  //     break;
                  this.router.navigate['/profile']
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
}
