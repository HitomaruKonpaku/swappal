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
  idskillneed : string;
  idskillhave : string;
  searchOpt :string;
  resultUser : any = [];
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
    var str: any;
    if (this.idskillhave=="null" ){
      str = '{"have":["'+this.idskillneed+'"]}'
    }else if (this.idskillneed=="null"){
      str = '{"want":["'+this.idskillhave+'"]}'
    }else {
      str = '{"have":["'+this.idskillneed+'"],"want":["'+this.idskillhave+'"]}';
    }
    var json = JSON.parse(str);

    this.apiService.searchSkill(json)
    .subscribe(
      data =>{
        console.log(data)
        if (data.result.docs.length==0){
          this.isShowData = false;
        }
        else{
          for (let i = 0; i<data.result.docs.length;i++){
            this.resultUser[i] = data.result.docs[i];
        }
          this.isShowData = true;
          console.log(this.resultUser);
        }
      },
      error =>{
        console.log("error")
      }
    )
  }

}
