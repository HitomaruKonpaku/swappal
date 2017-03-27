import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

describe("Test _service",function(){
    it("AlertService - success", function() {
        var success = function(message: string, keepAfterNavigationChange = false){
            this.keepAfterNavigationChange = keepAfterNavigationChange;
            return this.subject.next({ type: 'success', text: message });
    };
    expect(success).toThrow();
  });
  it("AlertService - getMessage", function() {
      var getMessage = function(){
          return this.subject.asObservable();
    };
    expect(getMessage).toThrow();
  });
  it("AlertService - error", function() {
      var error = function(message: string, keepAfterNavigationChange = false){
          this.keepAfterNavigationChange = keepAfterNavigationChange;
          return this.subject.next({ type: 'error', text: message });
    };
    expect(error).toThrow();
  });
});