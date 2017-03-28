import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { Tab } from '../app/profile/tab.component';

describe("Profile - Tabs Component",function(){
    it("Tabs Component - ngAfterContentInit",function(){
        var ngAfterContentInit = function(){
            return this.selectTab(this.tabs.first);
        };
        expect(ngAfterContentInit).toThrow();
    });
    it("Tabs Component - selectTab",function(){
        var selectTab = function(tab:Tab){
            return this.tabs.toArray().forEach(tab.active = false);
        };
        expect(selectTab).toThrow();
    });
});