import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {LoginUserDTO, RegisterUserDTO, User} from "../classes/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isLogedIn: Subject<boolean> = new Subject<boolean>();
  isLogedIn: Observable<boolean>;
  isLogedInValue: boolean;
  loggedInUser: User = null;

  constructor(private _http: HttpClient, private _router: Router) {
    this._isLogedIn.next(false);
    this.isLogedIn = this._isLogedIn.asObservable();
    this.isLogedInValue = false;
  }

  registerUser(user: RegisterUserDTO) {
    this._http.post("http://localhost:8080/users/register", JSON.stringify(user), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe(user => {
      alert("Successful registration\nPlease login")

      this._router.navigate(["login"]);
    }, error => {
      alert("An error occurred");
      this._router.navigate(["login"])
    })
  }

  loginUser(user: LoginUserDTO) {
    let password = btoa(user.password);
    this._http.post("http://localhost:8080/users/login", JSON.stringify(user), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe((user: User) => {
      this.isLogedInValue = true;
      this._isLogedIn.next(true);
      this.loggedInUser = user;
      this.loggedInUser.password = password;

      sessionStorage.setItem("account", JSON.stringify(user))

      this._router.navigate([""])
    }, error => {
      alert("An error has occurred")
    })
  }

  logoutUser() {
    sessionStorage.removeItem("account")
    this.loggedInUser = null;
    this.isLogedInValue = false;
    this._isLogedIn.next(false);
    this._router.navigate(["login"])
  }

  checkIfUserIsLoggedIn() {
    let sessionUser = sessionStorage.getItem("account")
    if (this.isLogedInValue && sessionUser) {
      this._isLogedIn.next(true);
      return true;
    } else if (sessionUser && !this.isLogedInValue) {
      this.loggedInUser = JSON.parse(sessionUser);
      this.isLogedInValue = true;
      this._isLogedIn.next(true);

      return true;
    } else {
      return false;
    }
  }
}
