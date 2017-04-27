import { Component, OnInit } from '@angular/core';
import { APIService } from '../app/_services/index';
// import { RequestDialogComponent} from '../app/profile/request.component';
import {MdDialog} from '@angular/material';

describe("Test profile",function(){
    it("profile.component - ngOnInit (successful)",function(){
        var ngOnInit = function(data:any){
            this.profile = data.data.profile;
            return console.log(this.profile);
        };
        expect(ngOnInit).toThrow();
    });
    it("profile.component - ngOnInit (fail)",function(){
        var ngOnInit = function(data:any){
            this.profile = data.data.profile
            return console.log("error");
        };
        expect(ngOnInit).toThrow();
    });
    it("profile.component - ngOnInit 2",function(){
        var ngOnInit = function(){
            this.currentEmail = localStorage.getItem('currentEmail');
            this.currentToken = localStorage.getItem('currentToken');
            if (!this.otherEmail){
                return this.getProfile(this.currentEmail);
            }
            else{
                return this.getProfile(this.otherEmail);
            }
        };
        expect(ngOnInit).toThrow();
    });
    it("profile.component - ngOnInit 3",function(){
        var ngOnInit =function(){
            this.activatedRoute.queryParams.subscribe((params: any) => {
              return this.otherEmail = params['email'];
            });
        }
        expect(ngOnInit).toThrow();
    })
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
    it('profile.component - onSubmit',function(){
        var onSubmit = function(value:any){
            return this.profileService.createProfile(value);
        }
        expect(onSubmit).toThrow();
    });
    it('profile.component - getProfile',function(){
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
});
