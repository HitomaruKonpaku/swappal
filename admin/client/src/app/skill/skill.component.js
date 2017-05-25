"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var index_1 = require("../_services/index");
var forms_1 = require("@angular/forms");
var SkillComponent = (function () {
    function SkillComponent(dialog, apiService) {
        this.dialog = dialog;
        this.apiService = apiService;
        this.skillList = [];
        this.skillListbyCate = [];
        this.isEdit = false;
        this.isDelete = false;
        this.cateList = [];
    }
    SkillComponent.prototype.ngOnInit = function () {
        this.skillCtrl = new forms_1.FormControl('');
        this.getAllSkill();
        this.getAllCate();
    };
    SkillComponent.prototype.getAllCate = function () {
        var _this = this;
        this.apiService.getAllCate2().subscribe(function (data) {
            _this.cateList = data.data;
            console.log(_this.cateList);
            for (var i = 0; i < _this.cateList.length; i++) {
                _this.skillListbyCate[i] = _this.cateList[i].skills;
            }
            console.log(_this.skillListbyCate);
        });
    };
    SkillComponent.prototype.getAllSkill = function () {
        var _this = this;
        this.apiService.getAllSkill().subscribe(function (data) {
            _this.skillList = data.data.docs;
        }, function (error) {
            console.log("error");
        });
    };
    SkillComponent.prototype.openAddDialog = function () {
        var config = new material_1.MdDialogConfig();
        var dialogRef = this.dialog.open(SkillDialog, {
            height: '300px',
            width: '400px',
        });
        dialogRef.componentInstance.isEdit = this.isEdit;
        dialogRef.componentInstance.cateList = this.cateList;
    };
    SkillComponent.prototype.deleteSkillDialog = function (skill) {
        this.isDelete = true;
        var config = new material_1.MdDialogConfig();
        var dialogRef = this.dialog.open(SkillDialog, {
            height: '220px',
            width: '400px',
        });
        dialogRef.componentInstance.isDelete = this.isDelete;
        dialogRef.componentInstance.skillName = skill;
    };
    SkillComponent.prototype.openEditDialog = function (skill, skillid) {
        this.isEdit = true;
        var config = new material_1.MdDialogConfig();
        var dialogRef = this.dialog.open(SkillDialog, {
            height: '300px',
            width: '400px',
        });
        dialogRef.componentInstance.isEdit = this.isEdit;
        dialogRef.componentInstance.skillName = skill;
        dialogRef.componentInstance.skillId = skillid;
        // dialogRef.componentInstance.category = category;
        dialogRef.componentInstance.cateList = this.cateList;
    };
    return SkillComponent;
}());
SkillComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'skill.component.html'
    }),
    __metadata("design:paramtypes", [material_1.MdDialog,
        index_1.APIService])
], SkillComponent);
exports.SkillComponent = SkillComponent;
var SkillDialog = (function () {
    function SkillDialog(dialogRef, apiService) {
        this.dialogRef = dialogRef;
        this.apiService = apiService;
        this.cateList = [];
    }
    SkillDialog.prototype.ngOnInit = function () {
        console.log(this.skillName);
    };
    SkillDialog.prototype.addSkill = function () {
    };
    SkillDialog.prototype.editSkill = function (skill) {
        var value = skill.value;
        value.skillid = this.skillId;
        console.log(value);
        this.apiService.editSkill(value).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log("error");
        });
    };
    return SkillDialog;
}());
SkillDialog = __decorate([
    core_1.Component({
        selector: 'skill-dialog',
        templateUrl: 'app/skill/skillDialog.component.html',
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef,
        index_1.APIService])
], SkillDialog);
exports.SkillDialog = SkillDialog;
//# sourceMappingURL=skill.component.js.map