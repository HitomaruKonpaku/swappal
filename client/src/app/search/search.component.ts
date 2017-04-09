import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import { APIService } from '../_services/index';
import {Skill} from '../_models/index';
import { NgForm } from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit{

  objectskills : any = {};
  skills : Skill[] = [];
  idskill : string;
  searchOpt : string[]=[];

  constructor(
    private apiService: APIService,
    private skillModel : Skill,
  ){}
  ngOnInit(){
    this.apiService.getAllSkills().
    subscribe(
    data => {
      this.objectskills = data.data.docs;
      for (let i = 0; i < this.objectskills.length; i++){
        this.skills[i] = this.objectskills[i];
      }

    },
    error => {
        console.log("error")
    })

  }

  onSubmit(f:NgForm){
    var value = f.value;
    console.log (f);
    console.log (value);

    console.log (value.searchOpt.idskill);

    this.apiService.searchSkill(value.searchOpt.idskill)
    .subscribe(
      data => {

      },
      error => {
          console.log("error")
      }
    )

  }
}
