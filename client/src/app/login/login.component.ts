import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForm,FormControl } from '@angular/forms';
import { AlertService, AuthenticationService, APIService, ValidationService } from '../_services/index';
import {MdDialog , MdDialogRef,MdDialogConfig} from '@angular/material';
import { AuthService } from 'angular2-social-login';
declare var $: any;


@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',

})

export class LoginComponent implements OnInit{
    model: any = {};
    profile: any = {};
    loading = false;
    returnUrl: string;
    email :any ;
    user : any;
    sub : any;
    mailCheck: boolean = false;
    passwordCheck: boolean = false;



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService : APIService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private dialog: MdDialog,
        private _auth: AuthService,
        private validation: ValidationService,
    ) { }

    ngOnInit() {
        if (this.authenticationService.status() === true) {
            this.router.navigate(['/']);
        }


        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }
    onSubmit(f: NgForm) {
        var v = f.value;
        this.loading = true;
        this.mailCheck = this.validation.EmailValidation(v.email);
        this.passwordCheck = this.validation.PasswordValidation(v.pwd);
        if (this.mailCheck == false){
          this.alertService.error('Xin nhập lại Email')
        }else if (this.passwordCheck == false){
          this.alertService.error('Mật khẩu phải có 8 kí tự trở lên')
        }else{
          this.authenticationService.login(v)
              .subscribe(
              data => {
                  switch (data.msg) {
                      case 'success':
                        this.profile = data.acc.profile;
                        if (!this.profile){

                          this.email = localStorage.getItem('currentEmail');
                          this.openCreateDialog(this.email);
                        }
                        else{
                          location.reload();
                          this.router.navigate(['/']);
                        }
                        this.alertService.success('Đăng nhập thành công', true);

                          break;
                      default:
                          this.alertService.error(data.msg);
                          this.loading = false;
                  }
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
        }



    }
    SocialLogin(email:any, userid : any){
      var str = '{"email":"'+email+'","pwd":"'+userid+'"}'
      var json = JSON.parse(str);
      this.apiService.create(json)
      this.authenticationService.login(json)
      .subscribe(
      data => {
          switch (data.msg) {
              case 'success':
                this.profile = data.acc.profile;
                if (!this.profile){

                  this.email = localStorage.getItem('currentEmail');
                  this.openCreateDialog(this.email);
                }
                else{
                  location.reload();
                  this.router.navigate(['/']);
                }
                this.alertService.success('Đăng nhập thành công', true);

                  break;
              case 'error':
                  console.log("error")
                  break;
          }
      },
      error => {

          this.alertService.error(error);
          this.loading = false;
      });
    }
  signIn(provider : any){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log(data);this.user=data;
        this.SocialLogin(this.user.email,this.user.uid);
      },
      (error)=>{

      }
    )
  }
  openCreateDialog(email:any){
    let config = new MdDialogConfig();
   let dialogRef:MdDialogRef<CreateProfileDialog> =  this.dialog.open(CreateProfileDialog,{
      height: '750px',
      width: '600px',
      disableClose:true
    });
   dialogRef.componentInstance.email = email;
  }


}

@Component({
  selector: 'profile-dialog',
  templateUrl:'app/login/createProfileDialog.component.html',
})
export class CreateProfileDialog implements OnInit {
  email:any;
  filteredSkills: any;
  cateList:any=[];
  skillListbyCate:any=[];
  cateNeedPosition:any;
  cateHavePosition:any;
  skillNeed: FormControl;
  skillHave: FormControl;
  loading = false;
  haveArr : any =[];
  haveArrObj: any =[];
  needArr: any =[];
  needArrObj:any =[];
  nameCheck : boolean = false;
  dobCheck : boolean = false;
  constructor( private apiService : APIService,
                private router: Router,
                private validation: ValidationService,
                private alertService: AlertService,
              ){}

  ngOnInit(){
    //need
    this.skillNeed = new FormControl('');
    this.filteredSkills = this.skillNeed.valueChanges
        .startWith(null)
        .map(name => this.filterNeedSkills(name));
    //have
    this.skillHave = new FormControl('');
    this.filteredSkills = this.skillHave.valueChanges
        .startWith(null)
        .map(name => this.filterHaveSkills(name));
    this.apiService.getcate2().subscribe(
      data=>{
        this.cateList = data.data
        console.log(this.cateList)
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
    console.log(value)
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
  onCreateProfile(a:NgForm){
    var value = a.value;
    value.email = this.email;
    console.log(value)
    var dobArr = value.dob.split("-")
    if (dobArr[0]<=2001){
      this.dobCheck = true;
    }

    this.nameCheck = this.validation.FullNameValidation(value.name)
    if (this.nameCheck == true && this.dobCheck == true){
      this.apiService.createProfile(value)
          .subscribe(
          data => {
              switch (data.msg) {
                  case 'success':
                  location.reload();
                  this.router.navigate(['/']);
                  break;
                    default: this.loading = false;
                    break;
              }
          })
      this.apiService.createSkillProfile(value.email,this.haveArr, this.needArr)
    }
    else if (this.nameCheck == false){
      this.alertService.error("Tên người dùng không được để trống hoặc sử dụng kí tự đặc biệt")
    }
    else if (this.dobCheck == false){
      this.alertService.error("Người dùng phải từ 16 tuổi trở lên")
    }
  }
}
