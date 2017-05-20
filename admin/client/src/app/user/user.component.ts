import {Component ,OnInit} from '@angular/core';
import {MdListModule} from '@angular/material';
import {MdDialog, MdDialogRef} from '@angular/material';
import {APIService} from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit{
  userList: any=[]
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
  openDialog(){
    this.dialog.open(UserDialog,{
      height:'400px',
      width:'400px',
    });
  }
}

@Component({
  selector: 'skill-dialog',
  templateUrl: 'app/user/userDialog.component.html',
})
export class UserDialog {
  constructor(public dialogRef: MdDialogRef<UserDialog>) {}
}
