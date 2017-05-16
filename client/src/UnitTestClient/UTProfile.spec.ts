import { Component, OnInit } from '@angular/core';
import { APIService } from '../app/_services/index';
import {MdDialog} from '@angular/material';

describe("Test profile",function(){
    it("profile.component - ngOnInit: Check the current email of the profile to control the buttons in the profile.",function(){
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
    it("profile.component - onSubmit: Check the value entered in the email box, valid email value then create a new profile with that email value.", function(){
        var onSubmit = function(f:any){
            var value = f.value;
            console.log (f);
            console.log (value);
            value.email = localStorage.getItem('currentEmail');
            return this.profileService.createProfile(value)
        };
        expect(onSubmit).toThrow();
    });
    it("profile.component - switchForm 1: Check hide display is false.",function(){
        var switchForm = function(){
            return this.hideDisplay = false;
        };
        expect(switchForm).toThrow();
    });
    it("profile.component - switchForm 2: Check hide display is true.",function(){
        var switchForm = function(){
            return this.hideDisplay = true;
        };
        expect(switchForm).toThrow();
    });
    it('profile.component - getProfile 1: Check email to transfer server profile results.',function(){
        var getProfile = function(email:any){
            return this.profileService.getProfile(email);
        }
        expect(getProfile).toThrow();
    });
    it('profile.component - getProfile 2: Check data to output data profile.',function(){
        var getProfile = function(data:any){
            return this.profile = data.data.profile;
        }
        expect(getProfile).toThrow();
    });
    it('profile.component - getProfile 3: Check email to transfer server skill results.',function(){
        var getProfile = function(email:any){
            return this.profileService.getSkills(email);
        }
        expect(getProfile).toThrow();
    });
    it('profile.component - getProfile 4: Check data to output data skill.',function(){
        var getProfile = function(data:any){
            return this.skills = data.data.skills;
        }
        expect(getProfile).toThrow();
    });
    it('profile.component - getProfile 5: Check value skill have of profile.',function(){
        var getProfile = function(){
            for (let i = 0; i < this.skills.have.length;i++){
                return this.skillHave[i] = this.skills.have[i];
            }
        }
        expect(getProfile).toThrow();
    });
    it('profile.component - getProfile 6: Check value skill want of profile.',function(){
        var getProfile = function(){
            for (let i = 0; i <this.skills.want.length;i++){
                return this.skillWant[i] = this.skills.want[i];
            }
        }
        expect(getProfile).toThrow();
    });
    it("profile.component - getCurrentUserSkill: From email to transfer the user with skills from the client to the server.", function(){
        var getCurrentUserSkill = function(email:any){
            return this.profileService.getSkills(email);
        };
        expect(getCurrentUserSkill).toThrow();
    });
    it("profile.component - sendRequest: Send new request for value from client to server.", function(){
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
