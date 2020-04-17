import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    role:string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        if(this.currentUser!=null){
            this.role = this.currentUser.username;
        }
        
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}