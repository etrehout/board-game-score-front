import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/service/login.service';
import { GlobalConstants } from 'src/assets/global/global-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output()
  back = new EventEmitter();

  user = new User();
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  
  constructor(private service: LoginService) { }

  ngOnInit(): void { }

  register() {
    if (this.email.valid && this.password.valid 
        && this.name.valid && this.surname.valid) {
      this.service.register(this.user).subscribe({
        next: (response) => {
          this.backEvent();
          console.log(response);
        },
        error: (err) => { 
          console.log(err);
        }
      })
    }
  }

  backEvent() {
    this.back.emit();
  }

  getErrorMessageName() {
    return GlobalConstants.ERROR_NAME;
  }

  getErrorMessageSurname() {
    return GlobalConstants.ERROR_SURNAME;
  }

  getErrorMessageEmail() {
    return this.email.hasError('required') 
      ? GlobalConstants.ERROR_EMAIL 
      : GlobalConstants.INVALID_EMAIL;
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') 
      ? GlobalConstants.ERROR_PASSWORD 
      : GlobalConstants.INVALID_PASSWORD;
  }

}