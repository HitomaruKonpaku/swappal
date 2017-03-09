import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'my-app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
    isLogin: boolean;

    constructor(
        private authService: AuthenticationService,
    ) { }

    ngOnInit() {
        this.updateLoginStatus();
    }

    updateLoginStatus() {
        this.isLogin = this.authService.status();
    }
}
