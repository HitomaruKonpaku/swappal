import { Component, OnInit} from '@angular/core';
import { APIService } from '../_services/index';
import { FormControl } from '@angular/forms';
import {Skill} from '../_models/index';
import { DomSanitizer,SafeHtml } from "@angular/platform-browser";
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  profile : any = {};
    objectskills : any = {};
  idskillneed : FormControl;
  idskillhave : FormControl;
  currentEmail:any;
  skills : Skill[] = [];
  constructor(
    private apiService : APIService,
    private _sanitizer: DomSanitizer,
  ){}
  ngOnInit(){
    this.currentEmail = localStorage.getItem('currentEmail');

    this.idskillhave = new FormControl('')
    this.idskillneed = new FormControl('')
    this.apiService.getAllSkills().
    subscribe(
    data => {
      console.log(data)
      this.objectskills = data.data;
      for (let i = 0; i < this.objectskills.length; i++){
        this.skills[i] = this.objectskills[i];
      }
    })
  }
  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
