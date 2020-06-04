import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class RegistrationComponent implements OnInit {
  
  registerForm: FormGroup;
  isNameError: boolean = false;
  isEmailError: boolean = false;
  isPasswordError: boolean = false;

  validation_messages = {
      'name': [
        { type: 'required', message: 'Name is required.' },
        { type: 'pattern', message: 'At least 4 letters.' }
      ],
      'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'email', message: 'Incorrect email' }
      ],
      'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'At least 4 characters' },
      ]
  }
 
  constructor(
    private authService: AuthenticationService
  ) {
    this.isPasswordError = false
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{4,}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
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

  // isValidEmail(): boolean {
  //   for(let i = 0; i < this.validation_messages.email.length; i++) {
  //     if(this.registerForm.get('name').hasError(this.validation_messages.name[i].type) && (this.registerForm.get('name').dirty || this.registerForm.get('name').touched)){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // isValidPassword(): boolean {
  //   for(let i = 0; i < this.validation_messages.email.length; i++) {
  //     if(this.registerForm.get('name').hasError(this.validation_messages.password[i].type) && (this.registerForm.get('name').dirty || this.registerForm.get('name').touched)){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  registration(): void {
    
    // if(this.registerForm.valid) {
    //    const user = {
    //     name: this.registerForm.get('name').value,
    //     email: this.registerForm.get('email').value,
    //     password: this.registerForm.get('password').value,
    //   }
    //   this.authService.register(user).subscribe(data => {
    //     console.log(data);
    //   })
    // }
  }

  ngOnInit() {}

}
