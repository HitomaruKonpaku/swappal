// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// describe("Test _Guards",function(){
//     it("Auth.guard - canActivate: Redirect the page when login is successful.",function(){
//         var canActivate = function(state: RouterStateSnapshot){
//             if (localStorage.getItem('currentUser')) {
//                 return true;
//             }
//             this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//              return false;
//         }
//         expect(canActivate).toThrow();
//     });
//     it('Auth.guard - navigate: Redirect the page when login fails.',function(){
//         var navigate = function(state: RouterStateSnapshot){
//             this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//             return false;
//         }
//         expect(navigate).toThrow();
//     })
// });