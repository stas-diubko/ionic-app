import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLogin: boolean;
  isShowPassword: boolean = false;
  
  validation_messages = {
      'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Incorrect email' }
      ],
      'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'At least 4 characters' },
      ]
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private authHelper: AuthHelper,
    private userService: UserService
  ) { 
    this.authHelper.isAuthenticated();
    this.authHelper.isLogin$.subscribe(data => {
      this.isLogin = data;
    })

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i))]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });

    this.authService.register$.subscribe((data :any)=> {
      this.loginForm.patchValue({
        email: data.email,
        password: data.password
      })
    })
  }

  isValidField(name: string): boolean {
    for(let i = 0; i < this.validation_messages[name].length; i++) {
      if(this.loginForm.get(name).hasError(this.validation_messages[name][i].type) && (this.loginForm.get(name).dirty || this.loginForm.get(name).touched)){
        return true;
      }
    }
    return false;
  }

  login(): void {
    if(this.loginForm.valid) {
      const userData = {
        username: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      }
      this.authService.login(userData).subscribe(data => {
        this.authHelper.setLoginData(data);
        this.authHelper.isAuthenticated();
        this.userService.getUserData();
        this.router.navigateByUrl('/home/products');
      })
    }
  }

  onBoxPasswordChange(e) {
    this.isShowPassword = e.detail.checked;
  }

  ngOnInit() {
    if(this.isLogin) return this.router.navigateByUrl('/home/products');
  }

}
