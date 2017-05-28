"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_1 = require("./app.routing");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var index_1 = require("./_layouts/index");
var index_2 = require("./home/index");
var index_3 = require("./_directives/index");
var ng2_auto_complete_1 = require("ng2-auto-complete");
var index_4 = require("./user/index");
var index_5 = require("./skill/index");
var index_6 = require("./report/index");
var index_7 = require("./login/index");
var index_8 = require("./feedback/index");
var index_9 = require("./news/index");
var angular2_chartjs_1 = require("angular2-chartjs");
var material_2 = require("@angular/material");
var index_10 = require("./_services/index");
var animations_1 = require("@angular/platform-browser/animations");
var material_3 = require("@angular/material");
var app_component_1 = require("./app.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            forms_1.ReactiveFormsModule,
            forms_1.FormsModule,
            ng2_auto_complete_1.Ng2AutoCompleteModule,
            http_1.HttpModule,
            angular2_chartjs_1.ChartModule,
            material_1.MdAutocompleteModule,
            app_routing_1.routing,
            material_3.MdButtonModule,
            material_3.MdCheckboxModule,
            material_2.MaterialModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            index_1.HeaderComponent,
            index_2.HomeComponent,
            index_4.UserComponent,
            index_6.ReportComponent,
            index_7.LoginComponent,
            index_5.SkillComponent,
            index_8.FeedbackComponent,
            index_9.NewsComponent,
            index_5.SkillDialog,
            index_4.UserDialog,
            index_3.AlertComponent,
            index_5.CategoryComponent,
            index_5.CategoryDialog,
        ],
        providers: [
            index_10.AlertService,
            index_10.APIService,
            index_10.ValidationService,
        ],
        entryComponents: [
            index_5.SkillDialog,
            index_4.UserDialog,
            index_5.CategoryDialog,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map