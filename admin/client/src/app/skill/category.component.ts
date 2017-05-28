import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import {APIService, ValidationService} from '../_services/index';
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
  openEditDialog(category: any, catid:any){
    this.isEdit = true;
    let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<CategoryDialog> =  this.dialog.open(CategoryDialog,{
      height:'300px',
      width:'400px',
    })
    dialogRef.componentInstance.isEdit = this.isEdit;
    dialogRef.componentInstance.category = category;
    dialogRef.componentInstance.catid = catid;
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
    catid:any;
    nameCheck : boolean = false;
    constructor(
      public dialogRef: MdDialogRef<CategoryDialog>,
      private apiService : APIService,
      private validation: ValidationService,
    ) {}

    addCate(f: NgForm){
      var value = f.value
      this.nameCheck = this.validation.NameValidation(value.name)
      if (this.nameCheck == true){
        this.apiService.addCate(value).subscribe(
          data=>{
            location.reload();
          }
        )
      }else{
        alert("Tên danh mục không được để trống hoặc có ký tự đặc biệt");
      }


    }
    editCate(edit:NgForm){
      var value = edit.value
      value.id = this.catid
      this.nameCheck = this.validation.NameValidation(value.name)
      if (this.nameCheck == true){
        this.apiService.editCat(value).subscribe(
          data=>{
            location.reload();
            alert("Sửa thành công");
          }
        )
      }else{
        alert("Tên danh mục không được để trống hoặc có ký tự đặc biệt");
      }
    }
  }
