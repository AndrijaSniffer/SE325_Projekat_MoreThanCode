import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  loginForm = true;
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _userService: UserService) {
  }

  ngOnInit(): void {
    this.buildFormGroups();
  }

  buildFormGroups() {
    this.loginFormGroup = this._formBuilder.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })

    this.registerFormGroup = this._formBuilder.group({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confPassword: new FormControl("", Validators.required)
    })
  }

  changeTab(isLoginForm: boolean) {
    this.loginForm = isLoginForm;
  }

  submitLogin() {
    this._userService.loginUser({
      username: this.loginFormGroup.value.username,
      password: this.loginFormGroup.value.password
    })
  }

  submitRegister() {
    if (this.registerFormGroup.value.password === this.registerFormGroup.value.confPassword) {
      this._userService.registerUser({
        firstName: this.registerFormGroup.value.firstName,
        lastName: this.registerFormGroup.value.lastName,
        username: this.registerFormGroup.value.username,
        password: this.registerFormGroup.value.password
      })

      this.loginForm = true;
    }
  }

}
