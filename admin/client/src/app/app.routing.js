"use strict";
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var index_2 = require("./user/index");
var index_3 = require("./skill/index");
var index_4 = require("./report/index");
var index_5 = require("./login/index");
var index_6 = require("./feedback/index");
var index_7 = require("./news/index");
var appRoutes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: index_1.HomeComponent },
    { path: 'login', component: index_5.LoginComponent },
    { path: 'feedback', component: index_6.FeedbackComponent },
    { path: 'report', component: index_4.ReportComponent },
    { path: 'skill', component: index_3.SkillComponent },
    { path: 'user', component: index_2.UserComponent },
    { path: 'news', component: index_7.NewsComponent },
    // { path: 'logout', component: LogoutComponent },
    // { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map