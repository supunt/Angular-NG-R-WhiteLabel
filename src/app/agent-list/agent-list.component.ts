import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/export';
import { ComponentBase } from '../shared/classes/exports';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent extends ComponentBase implements OnInit {

  public agentList: User[] = [];
  @Output() agentClicked: EventEmitter<User> = new EventEmitter<User>();

  // -------------------------------------------------------------------------------------------------------------------
  constructor(private userSvc: UserService) {
    super();
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.rxs(this.userSvc.loadAgents().subscribe(
      (data: User[]) => { this.agentList =  data; },
      err => this.agentList = []
    ));
  }

}
