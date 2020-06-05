import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class RegistrationComponent implements OnInit {
  
  registerForm: FormGroup;
  isShowPassword: boolean = false;

  validation_messages = {
      'name': [
        { type: 'required', message: 'Name is required.' },
        { type: 'pattern', message: 'At least 4 letters.' }
      ],
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
    private _router: Router,
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{4,}')]),
      email: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i))]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  isValidField(name: string): boolean {
    for(let i = 0; i < this.validation_messages.name.length; i++) {
      if(this.registerForm.get(name).hasError(this.validation_messages[name][i].type) && (this.registerForm.get(name).dirty || this.registerForm.get(name).touched)){
        return true;
      }
    }
    return false;
  }

  registration(): void {
    if(this.registerForm.valid) {
       const user = {
        name: this.registerForm.get('name').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
      }
      this.authService.register(user).subscribe(() => {
        this.authService.setLoginState({email: user.email, password: user.password});
        this._router.navigateByUrl('/auth/login');
      })
    }
  }

  onBoxPasswordChange(e) {
    this.isShowPassword = e.detail.checked;
  }

  ngOnInit() {}

}
