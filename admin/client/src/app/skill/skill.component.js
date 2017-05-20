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
    }
    SkillComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getAllSkill().subscribe(function (data) {
            // this.userList = data.result;
            _this.skillList = data.data.docs;
            console.log(_this.skillList);
        }, function (error) {
            console.log("error");
        });
    };
    SkillComponent.prototype.openDialog = function () {
        this.dialog.open(SkillDialog, {
            height: '300px',
            width: '400px',
        });
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