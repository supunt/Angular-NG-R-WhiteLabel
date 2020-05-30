import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../shared/classes/exports';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.scss']
})
export class UserWelcomeComponent extends ComponentBase implements OnInit {

  public LoggedinUserName = '';

  constructor(private userSvc: UserService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.userSvc.$loggedInUser.subscribe((data) => this.LoggedinUserName = data.userName);
  }


  public logout() {
    localStorage.removeItem('userToken');
    this.rxs(this.userSvc.logout().subscribe(
      () => this.router.navigate(['/login']),
      err => this.router.navigate(['/login'])
    ));
  }
}
