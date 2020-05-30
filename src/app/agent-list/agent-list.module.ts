import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentListComponent } from './agent-list.component';



@NgModule({
  declarations: [AgentListComponent],
  imports: [
    CommonModule
  ],
  exports: [AgentListComponent]
})
export class AgentListModule { }
