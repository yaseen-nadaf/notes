// Import all pipes in this module and import this module
// in every other modules to use any pipe

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';


@NgModule({
  declarations: [SearchPipe],
  imports: [
    CommonModule
  ],
  exports: [SearchPipe]
})
export class PipesModule { }
