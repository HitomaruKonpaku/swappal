import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {APIService} from '../_services/index';
import { Skill } from '../_models/index';
@Component({
  moduleId: module.id,
  templateUrl: 'skill.component.html'
})

export class SkillComponent implements OnInit{
  skillList: Skill[] =[];
  constructor(
    public dialog: MdDialog,
    private apiService: APIService,
  ){}
  ngOnInit(){
    this.apiService.getAllSkill().subscribe(
    data => {
      // this.userList = data.result;
      this.skillList = data.data.docs;
      console.log(this.skillList);
    },
    error => {
        console.log("error")
    })

  }
  openDialog(){
    this.dialog.open(SkillDialog,{
      height:'300px',
      width:'400px',
    });
  }
}

@Component({
  selector: 'skill-dialog',
  templateUrl: 'app/skill/skillDialog.component.html',
})
export class SkillDialog {
  constructor(public dialogRef: MdDialogRef<SkillDialog>) {}
}
