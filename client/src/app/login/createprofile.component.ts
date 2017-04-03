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
  email : any;
  day = new Array(12);
  month = new Array(31);
  year = new Array(2017);

  constructor(
      private router: Router,
      private apiService: APIService,
      ) {}
  ngOnInit(){
      this.email = localStorage.getItem('currentEmail');
  }
  onSubmit(f:NgForm){
    var value = f.value;
    console.log (f);
    console.log (value);
    value.email = this.email;
    this.apiService.createProfile(value)
        .subscribe(
        data => {
            switch (data.msg) {
                case 'success':
                console.log("success");

                this.router.navigate['/']
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
