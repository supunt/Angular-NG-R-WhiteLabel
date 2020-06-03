import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
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
  public showBalloon = false;

  @ViewChild('toggler', {static : false }) toggleButton: ElementRef;

  constructor(private userSvc: UserService, private router: Router, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    this.userSvc.$loggedInUser.subscribe((data) => this.LoggedinUserName = data.userName);
    this.renderer.listen('window', 'click', (e) => {

      if (this.toggleButton != null && this.toggleButton.nativeElement === e.target) {
        this.showBalloon = true;
      } else {
        this.showBalloon = false;
      }
     });
  }

  public logout() {
    localStorage.removeItem('userToken');
    this.rxs(this.userSvc.logout().subscribe(
      () => this.router.navigate(['/login']),
      err => this.router.navigate(['/login'])
    ));
  }
}
