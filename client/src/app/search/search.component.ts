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
  searchOpt :string;
  skillHave: any = [];
  skillWant: any = [];
  resultUserProfiles : any = [];
  resultUserSkill: any =[];
  resultUserSkillsHave: any =[];
  resultUserSkillsWant: any =[];

  displayInformation: boolean = true;


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

  onSubmit(){
    var str = '{'+ '"'+this.searchOpt+'"' +':["'+this.idskill+'"]}';

    var json = JSON.parse(str);


    this.apiService.searchSkill(json)
    .subscribe(
      data =>{

        if (this.displayInformation == true){
          this.displayInformation = false;
        }else{
          this.displayInformation = true;
        }
        console.log(data)

        for (let i = 0; i<data.result.docs.length;i++){
          this.resultUserProfiles[i] = data.result.docs[i].profile;
          this.resultUserSkill[i] = data.result.docs[i].skills;
          for( let j =0 ; j< this.resultUserSkill[i].have.length;j++){
            this.skillHave[j] =  this.resultUserSkill[i].have[j];
          }
          console.log(this.skillHave)

          for (let k = 0; k <this.resultUserSkill[i].want.length;k++){
            this.skillWant[k] = this.resultUserSkill[i].want[k];
          }
          console.log(this.skillWant)
        }



      },
      error =>{
        console.log("error")
      }
    )
  }
}
