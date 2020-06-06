import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ComponentBase } from 'src/app/shared/classes/exports';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/export';
import { Store, select } from '@ngrx/store';
import UsersState from 'src/app/shared/state/users.state';
import * as UserActions from '../../shared/actions/users.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends ComponentBase implements OnInit{

  @ViewChild('userListRef', {static: false}) userListRef: ElementRef;
  @ViewChild('togOn', {static: false}) togOn: ElementRef;
  allusers$: Observable<UsersState>;
  users: User[] = [];
  userBubbleHidden = true;
  
  // -------------------------------------------------------------------------------------------------------------------
  constructor(private store: Store<{ users: UsersState }>, private renderer: Renderer2) {
    super();
    this.allusers$ = store.pipe(select('users'));
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.rxs(this.allusers$.subscribe(
      data => {
        this.users = data.users;
        if (data.UserError != null) {
          console.error(data.users);
        }
      }
    ));

    this.store.dispatch(UserActions.BeginGetUserAction());

    this.renderer.listen('window', 'click', (event: Event) => {
      if (this.togOn != null && this.togOn.nativeElement.contains(event.target)) {
        this.userBubbleHidden = false;
        event.stopPropagation();
      } else if (this.userListRef != null && !this.userListRef.nativeElement.contains(event.target)) {
        this.userBubbleHidden = true;
        event.stopPropagation();
      }
    });
  }

  // -------------------------------------------------------------------------------------------------------------------
  refresh() {
    this.store.dispatch(UserActions.BeginGetUserAction());
  }
}
