import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { User, FormFields } from '../shared/export';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  sendAsync = false;
  formGroup: FormGroup;
  public loginError = null;
  constructor(private formBuilder: FormBuilder, private loginSvc: LoginService, private router: Router) { }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.formGroup = this.formBuilder.group( {
      username: FormFields.required(),
      password: FormFields.required(),
    });
  }

  // -------------------------------------------------------------------------------------------------------------------
  login() {
    this.sendAsync = true;
    this.loginError = null;
    this.loginSvc.login(this.formGroup.controls.username.value, this.formGroup.controls.password.value).
    subscribe(
      (data: User) =>  {
        this.sendAsync = false;
        this.loginSvc.notifyLoginSuccess(data);
        localStorage.setItem('userToken', JSON.stringify(data.token));
        localStorage.setItem('loggedinUser', data.userId);
        localStorage.setItem('iconColor', data.iconColor);
        this.router.navigate(['/home']);
      },
      err => {
        if (err.status === 401) {
          this.loginError = 'Username or Password is incorrect.';
        } else {
          console.error('Server Error', err);
          this.loginError = 'Server Error';
        }
        this.sendAsync = false;
      }
    );
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.key === 'Enter') {
      if (this.formGroup.valid) {
        this.login();
      }
    }
  }
}
