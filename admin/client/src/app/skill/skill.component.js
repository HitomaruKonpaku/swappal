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
var SkillComponent = (function () {
    function SkillComponent(dialog, apiService) {
        this.dialog = dialog;
        this.apiService = apiService;
        this.skillList = [];
        this.isEdit = false;
        this.isDelete = false;
    }
    SkillComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getAllSkill().subscribe(function (data) {
            _this.skillList = data.data.docs;
            console.log(_this.skillList);
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
    };
    SkillComponent.prototype.deleteSkillDialog = function (skill) {
        this.isDelete = true;
        var config = new material_1.MdDialogConfig();
        var dialogRef = this.dialog.open(SkillDialog, {
            height: '220px',
            width: '400px',
        });
        dialogRef.componentInstance.isDelete = this.isDelete;
        dialogRef.componentInstance.skill = skill;
    };
    SkillComponent.prototype.openEditDialog = function (skill, category) {
        this.isEdit = true;
        var config = new material_1.MdDialogConfig();
        var dialogRef = this.dialog.open(SkillDialog, {
            height: '300px',
            width: '400px',
        });
        dialogRef.componentInstance.isEdit = this.isEdit;
        dialogRef.componentInstance.skill = skill;
        dialogRef.componentInstance.category = category;
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
    function SkillDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return SkillDialog;
}());
SkillDialog = __decorate([
    core_1.Component({
        selector: 'skill-dialog',
        templateUrl: 'app/skill/skillDialog.component.html',
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], SkillDialog);
exports.SkillDialog = SkillDialog;
//# sourceMappingURL=skill.component.js.map