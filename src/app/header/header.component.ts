import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '../shared/helpers/auth.helper';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../core/services/authentication.service';
import { Router, NavigationStart } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  isAuthPage: boolean;
  userData: any;

  constructor(
    private authHelper: AuthHelper,
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService 
  ) { 
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.isAuthPage = event.url === '/auth/registration' || event.url === '/auth/login' ? true : false;
      }
    });

    this.authHelper.isAuthenticated();
    this.authHelper.isLogin$.subscribe(data => {
      this.isLogin = data;
    })

    this.userService.userData$.subscribe(data => {
      this.userData = data;
    })
  }


 logOut() {
  this.authService.onLogOut();
 }

  ngOnInit() {
     
  }

}
