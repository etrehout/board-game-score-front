import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { GlobalConstants } from 'src/assets/global/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = { username: "", password: "" };
  user: any = { 'user': '', role: Array };
  loginPage = true;
  error = false;
  errorMessage = "";

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  @Output()
  register = new EventEmitter();

  constructor(private service: LoginService) { }

  ngOnInit(): void { }

  login() {
    if (this.email.valid && this.password.valid) {
      this.service.login(this.credentials).subscribe({
        next: (result) => {
          this.user = result;
          const session = { 'user': this.user.user, 'role': this.user.role[0].authority }
          sessionStorage.setItem('user', JSON.stringify(session))
        },
        error: (err: { error: { error: string; }; }) => {
          this.errorMessage = err.error.error;
          this.error = true;
        }
      });
    }
  }

  registerEvent() {
    this.register.emit();
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

  changePage() {
    this.loginPage = !this.loginPage;
  }

}
