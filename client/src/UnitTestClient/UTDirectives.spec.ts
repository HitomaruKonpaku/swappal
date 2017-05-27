import { Component, OnInit } from '@angular/core';

import { AlertService } from '../app/_services/index';

describe("Test _Directives",function(){
    it("Alert.component - ngOnInit: The message returned when using the function.",function(){
        var ngOnInit = function(message:any){
            return this.alertService.getMessage().subscribe(this.message = message);
        }
        expect(ngOnInit).toThrow();
    });
});