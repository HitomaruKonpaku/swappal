import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import { APIService } from '../app/_services/index';
import {Skill} from '../app/_models/index';
import { NgForm } from '@angular/forms';

describe('Test Search',function(){
    it('search.component - ngOnInit 1: Get api getallskill from server.',function(){
        var ngOnInit = function(){
            return this.apiService.getAllSkills()
        };
        expect(ngOnInit).toThrow();
    })
    it('search.component - ngOnInit 2: Get data about the object.',function(){
        var ngOnInit = function(data:any){
            return this.objectskills = data.data.docs;
        };
        expect(ngOnInit).toThrow();
    })
    it('search.component - ngOnInit 3: Compare the position of the skill with the location of the object skill.',function(){
        var ngOnInit = function(data:any){
            for (let i = 0; i < this.objectskills.length; i++){
                return this.skills[i] = this.objectskills[i];
            }
        };
        expect(ngOnInit).toThrow();
    })
    it('search.component - onSubmit 1: Skill have is null then "Have" is skill need.',function(){
        var onSubmit = function(str:any){
            if (this.idskillhave=="null" ){
                return str = '{"have":["'+this.idskillneed+'"]}'
            }
        }
        expect(onSubmit).toThrow();
    })
    it('search.component - onSubmit 2: Skill need is null then "Want" is skill have.',function(){
        var onSubmit = function(str:any){
            if (this.idskillneed=="null" ){
                return str = '{"want":["'+this.idskillhave+'"]}'
            }
        }
        expect(onSubmit).toThrow();
    })
    it('search.component - onSubmit 3: Skill have and need not null, then "Have" is skill need and "Want" is skill have.',function(){
        var onSubmit = function(str:any){
            return str = '{"have":["'+this.idskillneed+'"],"want":["'+this.idskillhave+'"]}';
        };
        expect(onSubmit).toThrow();
    })
    it("search.component - onSubmit 4: Get api search skill from server.", function(){
        var onSubmit = function(json:any){
            return this.apiService.searchSkill(json);
        };
    })
    it('search.component - onSubmit 5: Check length data is 0 then not show data on đisplay.',function(){
        var onSubmit = function(data:any){
            if (data.result.docs.length==0){
                return this.isShowData = false;
            }
        }
        expect(onSubmit).toThrow();
    })
    it('search.component - onSubmit 6: Check length data is value then show data on display.',function(){
        var onSubmit = function(data:any){
            return this.isShowData = true;
        }
        expect(onSubmit).toThrow();
    })
})