import {it, describe, expect, inject, injectAsync, beforeEach, beforeEachProviders} from 'angular2/testing';

import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http}   from 'angular2/http';
import {RouteRegistry, Router, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';

import 'rxjs/Rx';

// import {UserService} from '../app/_services/user.service';
// import {User} from '../app/_models/user';
// import {LoginComponent} from '../app/login/login.component';
// import {AppComponent} from '../app/app.component';


// describe('User Login', () => {

//     beforeEachProviders(() => [ 
//         Http,
//         HTTP_PROVIDERS, 

//         RouteRegistry,
//         provide(Router, {useClass: RootRouter}),
//         provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),

//         User, 
//         UserService,
//         LoginComponent,
//     ]);

//     it('Should set auth token', inject([LoginComponent], (LoginComponent:any) => {
//         let token = "h83hdks95gt7";
//         LoginComponent.setAuthToken(token);

//         expect(LoginComponent.getAuthToken()).toBe(token);
//     }));

//     it('Should require email', injectAsync([LoginComponent], (LoginComponent:any) => {
//         return LoginComponent.login()
//                    .then((data:any) => {
//                        expect("Login").toContain("errors");
//                    })
//                    .catch((errors:any) => {
//                        expect(errors.has("requiredEmail")).toBeTruthy();
//                    });
//     }));

//     it('Should require password', injectAsync([LoginComponent], (LoginComponent:any) => {
//         return LoginComponent.login()
//                    .then((data:any) => {
//                        expect("Login").toContain("errors");
//                    })
//                    .catch((errors:any) => {
//                        expect(errors.has("requiredPassword")).toBeTruthy();
//                    });
//     }));

//     it('Should require valid email', injectAsync([LoginComponent], (LoginComponent:any) => {
//         LoginComponent.email = "invalid_email";

//         return LoginComponent.login()
//                    .then((data:any) => {
//                         expect("Login").toContain("errors");
//                    })
//                    .catch((errors:any) => {
//                        expect(errors.has("invalidEmail")).toBeTruthy();
//                    });
//     }));

//     it('Should require valid credentials', injectAsync([LoginComponent], (LoginComponent:any) => {
//         LoginComponent.email    = Math.random().toString() + "@email.com";
//        LoginComponent.password = "123456";

//         return LoginComponent.login()
//                    .then((data:any) => {
//                        expect("Login").toContain("errors");
//                    })
//                    .catch((errors:any) => {
//                        expect(errors.has("invalidCredentials")).toBeTruthy();
//                    });
//     }));

//     it('Should successfully login', injectAsync([LoginComponent], (LoginComponent:any) => {
//         LoginComponent.email    = "some_valid_email(at)gmail.com";
//         LoginComponent.password = "a_valid_password";
        
//         return LoginComponent.login()
//                    .then((data:any) => {
//                        expect(data.token).toBeDefined();
//                    })
//                    .catch((errors:any) => {
//                        expect("Login").toBe("successful");
//                    });
//     }));
// });