import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe("Test _Guards",function(){
    it("Auth.guard - ngOnInit",function(){
        var canActivate = function(state: RouterStateSnapshot){
            return this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        expect(canActivate).toThrow();
    });
});