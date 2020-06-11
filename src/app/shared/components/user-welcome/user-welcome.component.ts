import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '../../classes/exports';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.scss']
})
export class UserWelcomeComponent extends ComponentBase implements OnInit {

  public LoggedinUserName = '';
  public showBalloon = false;
  @ViewChild('toggler', {static : false }) toggleButton: ElementRef;

  // -------------------------------------------------------------------------------------------------------------------
  constructor(private loginSvc: LoginService, private router: Router, private renderer: Renderer2) {
    super();
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.loginSvc.$loggedInUser.subscribe((data) => this.LoggedinUserName = data.userName);
    this.renderer.listen('window', 'click', (e) => {

      if (this.toggleButton != null && this.toggleButton.nativeElement === e.target) {
        this.showBalloon = true;
      } else {
        this.showBalloon = false;
      }
     });
  }

  // -------------------------------------------------------------------------------------------------------------------
  public logout() {
    localStorage.removeItem('loggedinUser');
    this.rxs(this.loginSvc.logout().subscribe(
      () =>  {
        this.router.navigate(['/login']);
        this.clearStorage();
      },
      err =>  {
        this.router.navigate(['/login']);
        this.clearStorage();
      }
    ));
  }

  // -------------------------------------------------------------------------------------------------------------------
  private clearStorage() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('iconColor');
  }
}
