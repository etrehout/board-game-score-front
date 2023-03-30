import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  show = false;
  user = new User();
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  passwordString1 = "";
  passwordString2 = "";
  passwordForm1 = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordForm2 = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void { }

  register() {
    if (this.email.valid && this.passwordForm1.valid
      && this.name.valid && this.surname.valid
      && this.passwordString1 === this.passwordString2) {
      this.user.password = this.passwordString1;
      this.service.register(this.user).subscribe({
        next: (response) => {
          this.backEvent();
          this.router.navigate(['/login']);
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
    if (!(this.passwordString1 === this.passwordString2)) {
      return GlobalConstants.INVALID_PASSWORD;
    }
    return (this.passwordForm1.hasError('required')
      || this.passwordForm2.hasError('required'))
      ? GlobalConstants.ERROR_PASSWORD
      : GlobalConstants.MIN_PASSWORD;
  }

  showPassword() {
    this.show = !this.show;
  }

}