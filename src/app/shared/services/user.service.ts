import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { ReplaySubject, Subscribable, Subscription } from 'rxjs';
import { Property, GoogleMapMarker } from '../models/export';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {


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
  addLocation(loc: Property, silent = false) {
    if (silent) {
      this.userObject.managedLocations.push(loc);
      return;
    }

    this.subsriptions.push(this.http.post(this.apiUrl + '/Location/add', loc).subscribe(
      () => {
        this.userObject.managedLocations.push(loc);
        this.$loggedInUser.next(this.userObject);
      }
    ));
  }

  // -------------------------------------------------------------------------------------------------------------------
  removeLocation(mkr: Property) {
    let index = -1;

    let idx = 0;
    for (const item of this.userObject.managedLocations) {
      if (item.uuid === mkr.uuid) {
        index = idx;
        break;
      }
      idx += 1;
    }

    if (index !== -1) {
      this.subsriptions.push(this.http.post(this.apiUrl + '/Location/delete/' + mkr.uuid , {}).subscribe(
        () => {
          this.userObject.managedLocations.splice(index, 1);
          this.$loggedInUser.next(this.userObject);
        }
      ));
    }
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
