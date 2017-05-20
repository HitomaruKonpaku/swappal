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
var HomeComponent = (function () {
    function HomeComponent() {
        this.type = 'line';
        this.UserData = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "Sep"],
            datasets: [
                {
                    label: "USER",
                    data: [65, 59, 80, 81, 56, 55, 0, 40],
                    backgroundColor: [
                        'rgba(239, 104, 99, 0.7)',
                    ],
                }
            ]
        };
        this.FeedbackData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "FEEDBACK",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: [
                        'rgba(208, 168, 224, 0.7)',
                    ],
                }
            ]
        };
        this.SkillData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "SKILL",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: [
                        'rgba(162, 210, 0, 0.7)',
                    ],
                }
            ]
        };
        this.RequestData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "REQUEST",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: [
                        'rgba(34, 190, 239, 0.7)',
                    ],
                }
            ]
        };
        this.options = {
            responsive: true,
            maintainAspectRatio: false
        };
    }
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'home.component.html',
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map