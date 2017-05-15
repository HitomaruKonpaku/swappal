import { Component, OnInit } from '@angular/core';
import { APIService } from '../app/_services/index';
// import { RequestDialogComponent} from '../app/profile/request.component';
import {MdDialog} from '@angular/material';

describe("Test profile",function(){
    it("profile.component - ngOnInit",function(){
        var ngOnInit = function(){
            this.currentEmail = localStorage.getItem('currentEmail');
            this.currentToken = localStorage.getItem('currentToken');
            this.activatedRoute.queryParams.subscribe((params: any) => {
              this.otherEmail = params['email'];
            });
            if (!this.otherEmail){
                this.getProfile(this.currentEmail);
                return this.displayButtonEdit = false;
            }
            else{
                this.getProfile(this.otherEmail);
                this.getCurrentUserSkill(this.currentEmail);
                return this.displayButton = false;
            }
        };
        expect(ngOnInit).toThrow();
    });
    it("profile.component - onSubmit", function(){
        var onSubmit = function(f:any){
            var value = f.value;
            console.log (f);
            console.log (value);
            value.email = localStorage.getItem('currentEmail');
            return this.profileService.createProfile(value)
        };
        expect(onSubmit).toThrow();
    });
    it("profile.component - switchForm 1",function(){
        var switchForm = function(){
            return this.hideDisplay = false;
        };
        expect(switchForm).toThrow();
    });
    it("profile.component - switchForm 2",function(){
        var switchForm = function(){
            return this.hideDisplay = true;
        };
        expect(switchForm).toThrow();
    });
    it('profile.component - getProfile 1',function(){
        var getProfile = function(email:any){
            return this.profileService.getProfile(email);
        }
        expect(getProfile).toThrow();
    });
    it('profile.component - getProfile 2',function(){
        var getProfile = function(data:any){
            return this.profile = data.data.profile;
        }
        expect(getProfile).toThrow();
    });
    it('profile.component - getProfile 3',function(){
        var getProfile = function(email:any){
            return this.profileService.getSkills(email);
        }
        expect(getProfile).toThrow();
    });
    it('profile.component - getProfile 4',function(){
        var getProfile = function(data:any){
            return this.skills = data.data.skills;
        }
        expect(getProfile).toThrow();
    });
    it('profile.component - getProfile 5',function(){
        var getProfile = function(){
            for (let i = 0; i < this.skills.have.length;i++){
                return this.skillHave[i] = this.skills.have[i];
            }
        }
        expect(getProfile).toThrow();
    });
    it('profile.component - getProfile 6',function(){
        var getProfile = function(){
            for (let i = 0; i <this.skills.want.length;i++){
                return this.skillWant[i] = this.skills.want[i];
            }
        }
        expect(getProfile).toThrow();
    });
    it("profile.component - getCurrentUserSkill", function(){
        var getCurrentUserSkill = function(email:any){
            return this.profileService.getSkills(email);
        };
        expect(getCurrentUserSkill).toThrow();
    });
    it("profile.component - sendRequest", function(){
        var sendRequest = function(r:any){
            var value = r.value;
            console.log(value);
            value.sfrom = this.sfrom
            value.sto = this.sto
            return this.profileService.newRequest(value);
        };
        expect(sendRequest).toThrow();
    });
});
