import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import {APIService} from '../_services/index';
import {NgForm} from '@angular/forms';


@Component({
  moduleId: module.id,
  templateUrl:'category.component.html'
})

export class CategoryComponent implements OnInit {
  categoryList : any = [];
  isEdit : boolean = false;
  isDelete: boolean = false;
  constructor(
    public dialog: MdDialog,
    private apiService : APIService,
  ){}
  ngOnInit(){
    this.getAllCate();
  }
  getAllCate(){
    this.apiService.getAllCate().subscribe(
      data=>{
        this.categoryList = data.data;
        console.log(this.categoryList)
      },
      error=>{

      }
    )

  }
  openAddDialog(){
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<CategoryDialog> =  this.dialog.open(CategoryDialog,{
      height:'250px',
      width:'400px',
    });
    dialogRef.componentInstance.isEdit = this.isEdit;
  }

  deleteCategoryDialog(category:any){
    this.isDelete = true;
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<CategoryDialog> =  this.dialog.open(CategoryDialog,{
      height:'220px',
      width:'400px',
    });
    dialogRef.componentInstance.isDelete = this.isDelete;
    dialogRef.componentInstance.category = category;
  }
  openEditDialog(category: any){
    this.isEdit = true;
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<CategoryDialog> =  this.dialog.open(CategoryDialog,{
      height:'300px',
      width:'400px',
    })
    dialogRef.componentInstance.isEdit = this.isEdit;
    dialogRef.componentInstance.category = category;
  }
}

  @Component({
    selector: 'category-dialog',
    templateUrl: 'app/skill/categoryDialog.component.html',
  })
  export class CategoryDialog {
    isEdit :boolean;
    isDelete : boolean;
    category: any;
    constructor(
      public dialogRef: MdDialogRef<CategoryDialog>,
      private apiService : APIService,
    ) {}

    addCate(f: NgForm){
      var value = f.value
      this.apiService.addCate(value).subscribe(
        data=>{
          console.log(data)
        },
        error=>{
          console.log(error)
        }
      )

    }
  }
