import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule,
  MatGridListModule
} from "@angular/material";

import { MatListModule } from "@angular/material/list";

@NgModule({
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatListModule
  ],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatListModule
  ]
})
export class MaterialModule {}
