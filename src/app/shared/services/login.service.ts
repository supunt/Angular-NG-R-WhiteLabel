import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { ReplaySubject, Subscription } from 'rxjs';
import { Property } from '../models/export';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy {


  private apiUrl = environment.apiUrl;
  private subsriptions: Subscription[] = [];

  public $loggedInUser: ReplaySubject<User> = new ReplaySubject<User>();
  private userObject: User = null;
  constructor(private http: HttpClient) {
  }

  // -------------------------------------------------------------------------------------------------------------------
  login(username: string, password: string) {
    return this.http.post(this.apiUrl + '/user/login' , { UserName: username, Password: password});
  }

  // -------------------------------------------------------------------------------------------------------------------
  logout() {
    return this.http.post(this.apiUrl + '/user/Logout', {});
  }

  // -------------------------------------------------------------------------------------------------------------------
  isLoggedIn() {
    return this.http.get(this.apiUrl + '/user/isLoggedIn');
  }

  // -------------------------------------------------------------------------------------------------------------------
  notifyLoginSuccess(user: User) {
    this.userObject = new User();
    this.userObject.userId = user.userId;
    this.userObject.userName = user.userName;
    this.$loggedInUser.next(this.userObject);
  }

  // -------------------------------------------------------------------------------------------------------------------
  removeLocationByAdmin(mkr: Property, userId: string) {
    return this.http.post(this.apiUrl + '/Location/delete/' + mkr.uuid + `/${userId}`, {});
  }

  // -------------------------------------------------------------------------------------------------------------------
  loadAgents() {
    return this.http.get(this.apiUrl + '/user/get-my-agents');
  }

  // -------------------------------------------------------------------------------------------------------------------
  getMyLocations() {
    return this.http.get(this.apiUrl + '/Location/get-my-locations');
  }

  // -------------------------------------------------------------------------------------------------------------------
  getAgentLocations(id: string) {
    return this.http.get(this.apiUrl + '/Location/get-agent-locations/' + id);
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnDestroy(): void {
    for (const sub of this.subsriptions) {
      sub.unsubscribe();
    }
  }
}
