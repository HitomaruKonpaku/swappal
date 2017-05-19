import {Component, OnInit, Injectable} from '@angular/core';
import {MdDialog} from '@angular/material';
import { APIService } from '../_services/index';
import {Skill} from '../_models/index';
import { NgForm, FormControl } from '@angular/forms';
import { DomSanitizer,SafeHtml } from "@angular/platform-browser";
import { Router,ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './search.component.html',
})
@Injectable()
export class SearchComponent implements OnInit{

  objectskills : any = {};
  skills : Skill[] = [];
  idskillneed : FormControl;
  idskillhave : FormControl;
  paramHave: any;
  paramNeed: any;
  searchOpt :string;
  resultUser : any = [];
  isShowData: boolean = false;

  constructor(
    private apiService: APIService,
    private skillModel : Skill,
    private _sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
  ){}
  ngOnInit(){

    this.idskillhave = new FormControl('')
    this.idskillneed = new FormControl('')
    this.activatedRoute.queryParams.subscribe((params: Params) => {
            // this.otherEmail = params['email'];
            this.paramHave = params['have']
            this.paramNeed = params['need']
          });

    var str: any;
    if (!this.paramHave){
      str = '{"have":["'+this.paramNeed+'"]}'
    }else if (!this.paramNeed){
      str = '{"want":["'+this.paramHave+'"]}'
    }else {
      str = '{"have":["'+this.paramNeed+'"],"want":["'+this.paramHave+'"]}';
    }
    var json = JSON.parse(str);
    console.log(json)
    this.searchSkill(json);
    this.apiService.getAllSkills().
    subscribe(
    data => {
      this.objectskills = data.data.docs;
      for (let i = 0; i < this.objectskills.length; i++){
        this.skills[i] = this.objectskills[i];
      }
      console.log(this.skills)
    },
    error => {
        console.log("error")
    })
  }

  onSubmit(){
    // this.searchData(this.idskillhave.value.id,this.idskillneed.value.id);
    var str: any;
    if (!this.idskillhave.value.id){
      str = '{"have":["'+this.idskillneed.value.id+'"]}'
    }else if (!this.idskillneed){
      str = '{"want":["'+this.idskillhave.value.id+'"]}'
    }else {
      str = '{"have":["'+this.idskillneed.value.id+'"],"want":["'+this.idskillhave.value.id+'"]}';
    }
    var json = JSON.parse(str);

    this.searchSkill(json);

  }
  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  searchSkill(json:any){
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
