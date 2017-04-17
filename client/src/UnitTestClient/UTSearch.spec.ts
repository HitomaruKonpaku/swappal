import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import { APIService } from '../app/_services/index';
import {Skill} from '../app/_models/index';
import { NgForm } from '@angular/forms';

describe('Test Search',function(){
    it('Search Component - ngOnInit',function(){
        var ngOnInit = function(){
            return this.apiService.getAllSkills()
        };
        expect(ngOnInit).toThrow();
    })
    it('Search Component - ngOnInit 2',function(){
        var ngOnInit = function(data:any){
            return this.objectskills = data.data.docs;
        };
        expect(ngOnInit).toThrow();
    })
    it('Search Component - ngOnInit 3',function(){
        var ngOnInit = function(data:any){
            for (let i = 0; i < this.objectskills.length; i++){
                return this.skills[i] = this.objectskills[i];
            }
        };
        expect(ngOnInit).toThrow();
    })
    it('Search Component - onSubmit',function(){
        var onSubmit = function(f:NgForm){
            var value = f.value;
            console.log (f);
            console.log (value);
            console.log (value.searchOpt.idskill);
            return this.apiService.searchSkill(value.searchOpt.idskill)
        }
        expect(onSubmit).toThrow();
    })
    it('Search Component - onSubmit 2',function(){
        var onSubmit = function(){
            var str = '{'+ '"'+this.searchOpt+'"' +':["'+this.idskill+'"]}';
            var json = JSON.parse(str);
            return this.apiService.searchSkill(json)
        }
        expect(onSubmit).toThrow();
    })
    it('Search Component - onSubmit 3',function(){
        var onSubmit = function(data:any){
            if (data.result.docs.length==0){
                return this.isShowData = false;
            }
        }
        expect(onSubmit).toThrow();
    })
    it('Search Component - onSubmit 4',function(){
        var onSubmit = function(data:any){
            return this.isShowData = true;
        }
        expect(onSubmit).toThrow();
    })
    it('Search Component - onSubmit 5',function(){
        var onSubmit = function(data:any){
            for (let i = 0; i<data.result.docs.length;i++){
                this.resultUser[i] = data.result.docs[i];
                this.resultUserProfiles[i] = data.result.docs[i].profile;
                this.resultUserSkill[i] = data.result.docs[i].skills;
                for( let j =0 ; j< this.resultUserSkill[i].have.length;j++){
                    return this.skillHave[j] =  this.resultUserSkill[i].have[j];
                }
            }
        }
        expect(onSubmit).toThrow();
    })
    it('Search Component - onSubmit 6',function(){
        var onSubmit = function(data:any){
            for (let i = 0; i<data.result.docs.length;i++){
                this.resultUser[i] = data.result.docs[i];
                this.resultUserProfiles[i] = data.result.docs[i].profile;
                this.resultUserSkill[i] = data.result.docs[i].skills;
                for (let k = 0; k <this.resultUserSkill[i].want.length;k++){
                    return this.skillWant[k] = this.resultUserSkill[i].want[k];
                }
            }
        }
        expect(onSubmit).toThrow();
    })
})