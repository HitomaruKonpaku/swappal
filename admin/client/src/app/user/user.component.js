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
var UserComponent = (function () {
    function UserComponent(dialog, apiService) {
        this.dialog = dialog;
        this.apiService = apiService;
        this.userList = [];
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getUserList().subscribe(function (data) {
            _this.userList = data.result;
            console.log(data);
        }, function (error) {
            console.log("error");
        });
    };
    UserComponent.prototype.openDialog = function () {
        this.dialog.open(UserDialog, {
            height: '400px',
            width: '400px',
        });
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user.component.html'
    }),
    __metadata("design:paramtypes", [material_1.MdDialog,
        index_1.APIService])
], UserComponent);
exports.UserComponent = UserComponent;
var UserDialog = (function () {
    function UserDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return UserDialog;
}());
UserDialog = __decorate([
    core_1.Component({
        selector: 'skill-dialog',
        templateUrl: 'app/user/userDialog.component.html',
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], UserDialog);
exports.UserDialog = UserDialog;
//# sourceMappingURL=user.component.js.map