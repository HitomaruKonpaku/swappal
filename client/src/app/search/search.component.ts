import {Component, OnInit, Injectable} from '@angular/core';
import {MdDialog} from '@angular/material';
import { APIService } from '../_services/index';
import {Skill} from '../_models/index';
import { NgForm } from '@angular/forms';


@Component({
  moduleId: module.id,
  templateUrl: './search.component.html',
})
@Injectable()
export class SearchComponent implements OnInit{

  objectskills : any = {};
  skills : Skill[] = [];
  idskill : string;
  searchOpt :string;
  skillHave: any = [];
  skillWant: any = [];
  resultUser : any = [];
  resultUserProfiles : any = [];
  resultUserSkill: any =[];
  resultUserSkillsHave: any =[];
  resultUserSkillsWant: any =[];
  profiles : any =[];
  isShowData: boolean = false;


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
                  // console.log(decodeURIComponent('%40'))
  }

  onSubmit(){
    var str = '{'+ '"'+this.searchOpt+'"' +':["'+this.idskill+'"]}';

    var json = JSON.parse(str);


    this.apiService.searchSkill(json)
    .subscribe(
      data =>{
        console.log(data)
        if (data.result.docs.length==0){
          this.isShowData = false;
          console.log(this.isShowData);
        }
        else{
          for (let i = 0; i<data.result.docs.length;i++){
            this.resultUser[i] = data.result.docs[i];
            this.resultUserProfiles[i] = data.result.docs[i].profile;
            this.resultUserSkill[i] = data.result.docs[i].skills;
            for( let j =0 ; j< this.resultUserSkill[i].have.length;j++){
              this.skillHave[j] =  this.resultUserSkill[i].have[j];
            }
            for (let k = 0; k <this.resultUserSkill[i].want.length;k++){
              this.skillWant[k] = this.resultUserSkill[i].want[k];
            }
          }
          this.isShowData = true;
          console.log(this.isShowData);
        }
      },
      error =>{
        console.log("error")
      }
    )
  }

}
