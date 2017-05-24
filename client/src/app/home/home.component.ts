import { Component, OnInit} from '@angular/core';
import { APIService } from '../_services/index';
import { FormControl } from '@angular/forms';
import {Skill} from '../_models/index';
import { DomSanitizer,SafeHtml } from "@angular/platform-browser";;
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  profile : any = {};
    objectskills : any = {};
  idskillneed : FormControl;
  idskillhave : FormControl;
  skills : Skill[] = [];
  // animals = ["mouse", "dog", "cat", "bird"];
  // demo:any=[];
  constructor(
    private apiService : APIService,
    private _sanitizer: DomSanitizer,
  ){}
  ngOnInit(){
    this.idskillhave = new FormControl('')
    this.idskillneed = new FormControl('')
    this.apiService.getAllSkills().
    subscribe(
    data => {
      this.objectskills = data.data.docs;
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
