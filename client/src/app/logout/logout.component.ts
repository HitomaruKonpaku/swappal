import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    template: '',
})

export class LogoutComponent implements OnInit {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // navigate to homepage        
        this.router.navigate(['/']);

        // reload page        
        location.reload();
    }
}

