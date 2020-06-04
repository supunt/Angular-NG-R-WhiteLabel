import { NgModule } from '@angular/core';
import { AtElementsModule } from './elements/modules';
import { AtDirectivesModule } from './directives/modules';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [],
  exports: [
    AtElementsModule,
    AtDirectivesModule,
    ComponentsModule,
  ]
})
export class SharedModule { }
