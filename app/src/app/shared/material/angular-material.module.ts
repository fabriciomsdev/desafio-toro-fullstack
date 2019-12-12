import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule,
  MatGridListModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatProgressSpinnerModule
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
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
