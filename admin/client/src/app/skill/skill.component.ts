import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import {APIService, ValidationService} from '../_services/index';
import { Skill } from '../_models/index';
import {FormControl} from '@angular/forms';
import {NgForm} from '@angular/forms';
@Component({
  moduleId: module.id,
  templateUrl: 'skill.component.html'
})

export class SkillComponent implements OnInit{
  skillList: Skill[] =[];
  skillCtrl: FormControl;
  filteredSkills: any;
  skillListbyCate:Skill[]=[];
  isEdit : boolean = false;
  isDelete: boolean = false;
  cateList:any=[];
  catePosition:any;
  constructor(
    public dialog: MdDialog,
    private apiService: APIService,

  ){

  }
  ngOnInit(){
    this.skillCtrl = new FormControl('')
    this.getAllSkill();
    this.getAllCate();
  }
  getAllCate(){
    this.apiService.getAllCate2().subscribe(
      data=>{
          this.cateList = data.data;
          console.log(this.cateList)
          for(let i = 0; i < this.cateList.length;i++){
            this.skillListbyCate[i] = this.cateList[i].skills
          }
          console.log(this.skillListbyCate)
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
    this.isEdit = false;
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
    dialogRef.componentInstance.skillName = skill;
  }
  openEditDialog(skill:any, skillid: any){
    this.isEdit = true;
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<SkillDialog> =  this.dialog.open(SkillDialog,{
      height:'300px',
      width:'400px',
    })
    dialogRef.componentInstance.isEdit = this.isEdit;
    dialogRef.componentInstance.skillName = skill;
    dialogRef.componentInstance.skillId = skillid;
    dialogRef.componentInstance.cateList = this.cateList;
  }
}

@Component({
  selector: 'skill-dialog',
  templateUrl:'app/skill/skillDialog.component.html',
})
export class SkillDialog implements OnInit{
  isEdit :boolean;
  isDelete : boolean;
  skillName: any;
  skillId: any;
  category: any;
  cateList:any=[];
  nameCheck : boolean = false;
  constructor(
    public dialogRef: MdDialogRef<SkillDialog>,
    private apiService: APIService,
    private validation: ValidationService,
  ) {}
  ngOnInit(){}
  addSkill(add: NgForm){

    var value = add.value;
    this.nameCheck = this.validation.NameValidation(value.name)
    if (this.nameCheck == true){
      this.apiService.addSkill(value).subscribe(
        data=>{
          location.reload();
          alert("Thêm thành công");
        }
      )
    } else{
      alert("Tên kỹ năng không được để trống hoặc có ký tự đặc biệt");
    }


  }
  editSkill(skill: NgForm ){
    var value = skill.value;
    value.skillid = this.skillId;
    console.log(value)
    this.nameCheck = this.validation.NameValidation(value.name)
    if (this.nameCheck == true){
      this.apiService.editSkill(value).subscribe(
        data=>{
          console.log(data)
          alert("Sửa thành công");
          location.reload();
        },
        error=>{
          console.log(error)
        }
      )
    }else{
      alert("Tên kỹ năng không được để trống hoặc có ký tự đặc biệt")
    }

  }

}
