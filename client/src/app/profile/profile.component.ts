import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services/index';
import { DialogOverviewExampleDialog} from './request.component';
import {MdDialog} from '@angular/material';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    profile: any = {}
    name: string;
    constructor(
        private profileService: APIService,
        private dialog: MdDialog
    ) { }
    ngOnInit() {

        this.profileService.getProfile("ct95server@gmail.com")
            .subscribe(
            data => {
                this.profile = data.data.profile
                console.log(this.profile)
            },
            error => {
                console.log("error")
            })
    }

    openDialog(){
      this.dialog.open(DialogOverviewExampleDialog);
    }
}
