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
})