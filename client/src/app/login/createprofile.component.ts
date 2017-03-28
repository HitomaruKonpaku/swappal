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
      ) { }

  onSubmit(f: NgForm) {
      var value = f.value;
      var name = value.name;
    //  var dob = value.day + value.month + value.year;
      var address = value.address;
      var gender = value.gender;
      var location = value.location;
      // var skillhave = value.skillhave;
      // var skillneed = value.skillneed;
      var mission = value.mission;
      var achievement = value.achievement;
      this.apiService.createProfile(value)
          .subscribe(
          data => {
              switch (data.msg) {
                  case 'success':

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
