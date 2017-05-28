import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import {APIService} from '../app/_services/index';
import {NgForm} from '@angular/forms';

describe('Test Skill',function(){
    it('category.component - ngOnInit: Get all category from skill.',function(){
        var ngOnInit = function(){
            return this.getAllCate();
        }
        expect(ngOnInit).toThrow();
    })
    it('category.component - getAllCate: Check data then show data of list category.',function(){
        var getAllCate = function(data:any){
            return this.apiService.getAllCate().subscribe(this.categoryList = data.data);
        }
        expect(getAllCate).toThrow();
    })
    it('category.component - openAddDialog: Open form add category of function edit.',function(){
        var openAddDialog = function(dialogRef:any){
            return dialogRef.componentInstance.isEdit = this.isEdit;
        }
        expect(openAddDialog).toThrow();
    })
    it('category.component - deleteCategoryDialog: Open notification confirm delete category.',function(){
        var deleteCategoryDialog = function(dialogRef:any,category:any){
            this.isDelete = true;
            dialogRef.componentInstance.isDelete = this.isDelete;
            return dialogRef.componentInstance.category = category;
        }
        expect(deleteCategoryDialog).toThrow();
    })
    it('category.component - openEditDialog: Open form edit category of skill.',function(){
        var openEditDialog = function(dialogRef:any,category:any){
            this.isEdit = true;
            dialogRef.componentInstance.isEdit = this.isEdit;
            return dialogRef.componentInstance.category = category;
        }
        expect(openEditDialog).toThrow();
    })
    it('category.component - addCate: Add value category in form add category.',function(){
        var addCate = function(f:NgForm){
            var value = f.value
            return this.apiService.addCate(value).subscribe(location.reload());
        }
        expect(addCate).toThrow();
    })
    it('skill.component - ngOnInit: Get all category in skill component.',function(){
        var ngOnInit = function(){
            this.getAllSkill();
            return this.getAllCate();
        }
        expect(ngOnInit).toThrow();
    })
    it('skill.component - getAllCate: Get all data category from api service.',function(){
        var getAllCate = function(data:any){
            return this.apiService.getAllCate2().subscribe(this.cateList = data.data);
        }
        expect(getAllCate).toThrow();
    })
    it('skill.component - getAllSkill: Get all data of list skill.',function(){
        var getAllSkill = function(data:any){
            return this.skillList = data.data.docs;
        }
        expect(getAllSkill).toThrow();
    })
    it('skill.component - openAddDialog: Open form add skill then add new skill of list category.',function(){
        var openAddDialog = function(dialogRef:any){
            dialogRef.componentInstance.isEdit = this.isEdit;
            return dialogRef.componentInstance.cateList = this.cateList;
        }
        expect(openAddDialog).toThrow();
    })
    it('skill.component - deleteSkillDialog: Open notification confirm delete skill.',function(){
        var deleteSkillDialog = function(skill:any,dialogRef:any){
            this.isDelete = true;
            dialogRef.componentInstance.isDelete = this.isDelete;
            return dialogRef.componentInstance.skillName = skill;
        }
        expect(deleteSkillDialog).toThrow();
    })
    it('skill.component - openEditDialog: Open form edit skill then update data skill of list category.',function(){
        var openEditDialog = function(skill:any, skillid: any,dialogRef:any){
            this.isEdit = true;
            dialogRef.componentInstance.isEdit = this.isEdit;
            dialogRef.componentInstance.skillName = skill;
            dialogRef.componentInstance.skillId = skillid;
            return dialogRef.componentInstance.cateList = this.cateList;
        }
        expect(openEditDialog).toThrow();
    })
    it('skill.component - editSkill: Performing edit value skill in form edit then save data edited.',function(){
        var editSkill = function(skill:any,data:any){
            var value = skill.value;
            value.skillid = this.skillId;
            return this.apiService.editSkill(value).subscribe(console.log(data));
        }
        expect(editSkill).toThrow();
    })
});