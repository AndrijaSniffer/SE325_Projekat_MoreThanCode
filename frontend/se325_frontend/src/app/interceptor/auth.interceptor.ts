import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  urlExclusions = ["/users/register", "/users/login"]

  constructor(private _userService: UserService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }

  addAuth(request: HttpRequest<any>) {
    let excludedUrl = false;

    this.urlExclusions.forEach(url => {
      if (url == request.url) {
        excludedUrl = true;
      }
    })

    if (!excludedUrl) {
      let username = this._userService.loggedInUser.username;
      let password = atob(this._userService.loggedInUser.password);

      return request.clone({
        headers: request.headers.set('Content-Type', 'application/json; charset=utf-8'),
        setHeaders: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
      });
    } else {
      return request;
    }
  }
}
