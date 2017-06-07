import { Component, OnInit } from '@angular/core';
import { APIService , ValidationService} from '../_services/index';
import { NgForm,FormControl } from '@angular/forms';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {SearchComponent} from '../search/index';
import {HeaderComponent} from '../_layouts/index';

declare var $: any;
@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html',
})

export class ProfileComponent implements OnInit {
    show: boolean = true;
    profile: any = {};
    skills: any ={};
    skillHave: any = [];
    skillWant: any = [];
    userSkills : any ={};
    currentHave: any = [];
    requests: any = [];
    currentEmail: string;
    loading = false;
    displayInformation: boolean = false;
    displayHeadInformation: boolean = false;
    displaySkillInformation: boolean = false;
    displayEditHead:boolean = true;
    displayEdit: boolean = true;
    displayEditSkill: boolean = true;
    displayButton: boolean = true;
    displayButtonEdit: boolean = true;
    currentToken: string;
    otherEmail : string;
    sfrom : string;
    sto : string;
    emailfrom: string;
    isAccept: boolean;
    isEmail: boolean;
    isLogin: boolean = false;
    isRequest: boolean = false;
    isProgress : boolean =false;
    isOtherRequest: boolean = false;
    requestList: any=[];
    SkillCount: any;
    ServiceCount: any;
    requestID: any;
    filteredSkills: any;
    cateList:any=[];
    skillListbyCate:any=[];
    cateNeedPosition:any;
    cateHavePosition:any;
    skillNeedEdit: FormControl;
    skillHaveEdit: FormControl;
    haveArr : any =[];
    haveArrObj: any =[];
    needArr: any =[];
    needArrObj:any =[];
    dobCheck: boolean =false;
    nameCheck:boolean = false;
    idComplete: any ;

    constructor(
        private apiService: APIService,
        private activatedRoute: ActivatedRoute,
        private foundUser: SearchComponent,
        private header : HeaderComponent,
        private validation: ValidationService,
    ) { }
    ngOnInit() {
      this.currentEmail = localStorage.getItem('currentEmail');
      this.currentToken = localStorage.getItem('currentUser');
      this.requestList = JSON.parse(sessionStorage.getItem('dataRequests'));
      this.activatedRoute.queryParams.subscribe((params: Params) => {
              this.otherEmail = params['email'];
            });
        if (!this.otherEmail || this.currentEmail == this.otherEmail){
          this.getProfile(this.currentEmail);
          this.displayButtonEdit = false;
        }
        else{
          this.getProfile(this.otherEmail);
          this.getCurrentUserSkill(this.currentEmail);
          this.displayButton = false;
        }
        this.userCheck(this.currentEmail,this.otherEmail);
        this.skillNeedEdit = new FormControl('');
        this.filteredSkills = this.skillNeedEdit.valueChanges
            .startWith(null)
            .map(name => this.filterNeedSkills(name));
        //have
        this.skillHaveEdit = new FormControl('');
        this.filteredSkills = this.skillHaveEdit.valueChanges
            .startWith(null)
            .map(name => this.filterHaveSkills(name));
        this.apiService.getcate2().subscribe(
          data=>{
            this.cateList = data.data
            for(let i = 0; i < this.cateList.length;i++){
            this.skillListbyCate[i] = this.cateList[i].skills
            }
          sessionStorage.setItem('dataskillListbyCate', JSON.stringify(this.skillListbyCate));
          }
        )

    }
    filterNeedSkills(val: any) {
      return val ? this.skillListbyCate[this.cateNeedPosition].filter((s:any) => new RegExp(`^${val}`, 'gi').test(s))
                 : this.skillListbyCate[this.cateNeedPosition];
    }
    filterHaveSkills(val: any) {
      return val ? this.skillListbyCate[this.cateHavePosition].filter((s:any) => new RegExp(`^${val}`, 'gi').test(s))
                 : this.skillListbyCate[this.cateHavePosition];
    }
    addHavetoArray(have: NgForm){
      var value = have.value
      var skillList = JSON.parse(sessionStorage.getItem('dataskillListbyCate'))

      for (let i =0;i < skillList[this.cateHavePosition].length;i++)
      {
        if(skillList[this.cateHavePosition][i].name == value.have)
        {
          this.haveArrObj.push(skillList[this.cateHavePosition][i])
          this.haveArr.push(skillList[this.cateHavePosition][i]._id)
        }
      }
    }
    addNeedtoArray(need: NgForm){
      var value = need.value
      var skillList = JSON.parse(sessionStorage.getItem('dataskillListbyCate'))

      for (let i =0;i < skillList[this.cateNeedPosition].length;i++)
      {
        if(skillList[this.cateNeedPosition][i].name == value.need)
        {
          this.needArrObj.push(skillList[this.cateNeedPosition][i])
          this.needArr.push(skillList[this.cateNeedPosition][i]._id)
        }
      }
    }
    editProfile(f:NgForm){
      var value = f.value;
      value.email = localStorage.getItem('currentEmail');
      this.nameCheck = this.validation.FullNameValidation(value.name)
      var dobArr = value.dob.split("-")
      if (dobArr[0]<=2001){
        this.dobCheck = true;
      }
      if (this.nameCheck == true && this.dobCheck == true){
        this.apiService.createProfile(value)
            .subscribe(
            data => {
                switch (data.msg) {
                    case 'success':
                      location.reload()
                    break;
                      default: this.loading = false;
                      break;
                }
            });
      }
    }
    editSkill(){
      this.apiService.createSkillProfile(this.currentEmail,this.haveArr, this.needArr)
      .subscribe(
        data=>{
          console.log(data)
          location.reload();
        }
      )
    }
    switchForm(){
      if (this.displayInformation == true){
        this.displayInformation = false;
        this.displayEdit = true;
      }else {
        this.displayInformation = true;
        this.displayEdit = false;
      }
    }
    switchSkillForm(){
      if (this.displaySkillInformation == true){
        this.displaySkillInformation = false;
        this.displayEditSkill = true;
      }else {
        this.displaySkillInformation = true;
        this.displayEditSkill = false;
      }
    }
    switchHeadForm(){
      if (this.displayHeadInformation == true){
        this.displayHeadInformation = false;
        this.displayEditHead = true;
      }else {
        this.displayHeadInformation = true;
        this.displayEditHead = false;
      }
    }

    getProfile(email : any){
      this.apiService.getProfile(email)
          .subscribe(
          data => {
              this.profile = data.data.profile
          })
      this.apiService.getSkills(email)
          .subscribe(
          data => {
              this.skills = data.data.skills
              for (let i = 0; i < this.skills.have.length;i++){
                this.skillHave[i] = this.skills.have[i];
              }
              for (let i = 0; i <this.skills.want.length;i++){
                this.skillWant[i] = this.skills.want[i];
              }
          })
    }
    getCurrentUserSkill(email:any){
      this.apiService.getSkills(email)
            .subscribe(
              data=>{
                this.userSkills = data.data.skills
                for (let i = 0; i < this.userSkills.have.length;i++){
                  this.currentHave[i] = this.userSkills.have[i];
                }
              })
    }
    sendRequest(r:NgForm){
      var value = r.value;
      value.sfrom = this.sfrom
      value.sto = this.sto

      this.apiService.newRequest(value).subscribe(
        data=>{
          switch (data.msg) {
              case 'success':
                this.isRequest = true;
                break;
          }
        },
        error=>{

        }
      )
      $('#SwapModal').modal('hide');

    }
    writeReview(rating: NgForm){
      var value = rating.value;
      value.token = this.currentToken;
      value.email = this.currentEmail;
      value.requestid = this.requestID;
      this.apiService.writeReview(value).subscribe(
        data=>{
          location.reload()
        }
      )
    }
    userCheck(current: any, other:any){
      if (this.currentToken)
      {
        this.isLogin = true;
        for (let i =0; i < this.requestList.length;i++){
          if(this.requestList[i].accFrom.acc.email == current && this.requestList[i].accTo.acc.email == other )
          {
            this.isRequest = true;

            if (this.requestList[i].status)
            {
              if (this.requestList[i].status.accept.from && this.requestList[i].status.accept.to)
              {
                this.isProgress = true;
                this.requestID = this.requestList[i]._id
              }

            }else
            {
              return
            }
          } else if(this.requestList[i].accFrom.acc.email == other && this.requestList[i].accTo.acc.email == current )
          {
            this.isOtherRequest = true;
            if (this.requestList[i].status)
            {
              if (this.requestList[i].status.accept.from && this.requestList[i].status.accept.to)
              {
                this.isProgress = true;
                this.requestID = this.requestList[i]._id
              }
            }else
            {
              return
            }
          }
        }
      }
      else
      {
        return
      }

    }

}
