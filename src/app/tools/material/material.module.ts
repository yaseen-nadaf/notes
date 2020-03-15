// Import all necessary material APIs in this module and import this module
// in every other modules to use Angular Material

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule
  ]
})
export class MaterialModule { }
