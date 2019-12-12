import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material/angular-material.module';
import { UserGreetingComponent } from './user-greeting.component';


@NgModule({
  declarations: [UserGreetingComponent],
  imports: [CommonModule, MaterialModule],
  exports: [UserGreetingComponent]
})
export class UserGreetingModule {}
