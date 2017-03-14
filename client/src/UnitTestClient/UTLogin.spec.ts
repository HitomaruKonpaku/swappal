import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { LoginComponent } from '../app/login/login.component';
import {UserService} from '../app/_services';
// import {AuthenticationService} from '../app/_services/authentication.service';
import {AlertService} from '../app/_services';

describe('LoginComponent (inline template)', () => {

  let comp:    LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
    it('no title in the DOM until manually call `detectChanges`', () => {
      expect(el.textContent).toEqual('');
    });
    it('should display original title', () => {
      expect(el.textContent).toContain(comp.ngOnInit);
    });
    it('should still see original title after comp.title change', () => {
      const oldTitle = comp.onSubmit;
      expect(el.textContent).toContain(oldTitle);
    });
    it('should display updated title after detectChanges', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain(comp.onSubmit);
    });
  });
  // beforeEach(() => {
  //   // stub UserService for test purposes
  //   AlertService = {
  //     isLoggedIn: true,
  //     user: { name: 'Test User'}
  //   };

  //   TestBed.configureTestingModule({
  //      declarations: [ LoginComponent ],
  //      providers:    [ {provide: UserService, useValue: AlertService } ]
  //   });

  //   fixture = TestBed.createComponent(LoginComponent);
  //   comp    = fixture.componentInstance;

  //   // UserService from the root injector
  //   UserService = TestBed.get(UserService);

  //   //  get the "welcome" element by CSS selector (e.g., by class name)
  //   de = fixture.debugElement.query(By.css('.welcome'));
  //   el = de.nativeElement;
  // });
});