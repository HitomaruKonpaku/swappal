import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import {APIService} from '../_services/index';
import { Skill } from '../_models/index';
@Component({
  moduleId: module.id,
  templateUrl: 'skill.component.html'
})

export class SkillComponent implements OnInit{
  skillList: Skill[] =[];
  isEdit : boolean = false;
  isDelete: boolean = false;
  cateList:any=[];
  constructor(
    public dialog: MdDialog,
    private apiService: APIService,
  ){}
  ngOnInit(){
    this.getAllSkill();
    this.getAllCate();
  }
  getAllCate(){
    this.apiService.getAllCate().subscribe(
      data=>{
          this.cateList = data.data;
      }
    )
  }
  getAllSkill(){
    this.apiService.getAllSkill().subscribe(
    data => {
      this.skillList = data.data.docs;
    },
    error => {
        console.log("error")
    })
  }
  openAddDialog(){
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<SkillDialog> =  this.dialog.open(SkillDialog,{
      height:'300px',
      width:'400px',
    });
    dialogRef.componentInstance.isEdit = this.isEdit;
    dialogRef.componentInstance.cateList = this.cateList;
  }
  deleteSkillDialog(skill:any){
    this.isDelete = true;
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<SkillDialog> =  this.dialog.open(SkillDialog,{
      height:'220px',
      width:'400px',
    });
    dialogRef.componentInstance.isDelete = this.isDelete;
    dialogRef.componentInstance.skill = skill;
  }
  openEditDialog(skill:any, category: any){
    this.isEdit = true;
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<SkillDialog> =  this.dialog.open(SkillDialog,{
      height:'300px',
      width:'400px',
    })
    dialogRef.componentInstance.isEdit = this.isEdit;
    dialogRef.componentInstance.skill = skill;
    dialogRef.componentInstance.category = category;
  }
}

@Component({
  selector: 'skill-dialog',
  templateUrl:'app/skill/skillDialog.component.html',
})
export class SkillDialog implements OnInit{
  isEdit :boolean;
  isDelete : boolean;
  skill: any;
  category: any;
  cateList:any=[];
  constructor(
    public dialogRef: MdDialogRef<SkillDialog>,
    private apiService: APIService,
  ) {}
  ngOnInit(){
  }

}
