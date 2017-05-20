import {Component ,OnInit} from '@angular/core';
import {MdListModule} from '@angular/material';
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import {APIService} from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit{
  userList: any=[]
  isEdit: boolean = false;
  isDelete: boolean = false;
  constructor(
    public dialog: MdDialog,
    private apiService: APIService,
  ){}
  ngOnInit(){
    this.apiService.getUserList().subscribe(
    data => {
      this.userList = data.result;
      console.log(data);
    },
    error => {
        console.log("error")
    })
  }
  openAddDialog(){
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<UserDialog> =  this.dialog.open(UserDialog,{
      height:'400px',
      width:'400px',
    });
    dialogRef.componentInstance.isEdit = this.isEdit;
  }
  deleteUserDialog(email:any){
    this.isDelete = true;
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<UserDialog> =  this.dialog.open(UserDialog,{
      height:'250px',
      width:'400px',
    });
    dialogRef.componentInstance.isDelete = this.isDelete;
    dialogRef.componentInstance.email = email;
  }
  openEditDialog(email:any,id:any,profile:any){
    this.isEdit = true;
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<UserDialog> =  this.dialog.open(UserDialog,{
      height:'600px',
      width:'400px',
    })
    dialogRef.componentInstance.isEdit = this.isEdit;
    dialogRef.componentInstance.email = email;
    dialogRef.componentInstance.id = id;
    dialogRef.componentInstance.profile = profile;

  }
}

@Component({
  selector: 'user-dialog',
  templateUrl: 'app/user/userDialog.component.html',
})
export class UserDialog {
  isEdit:boolean;
  isDelete: boolean;
  email: any;
  id:any;
  profile: any ={};

  constructor(
    public dialogRef: MdDialogRef<UserDialog>
  ) {}

}
