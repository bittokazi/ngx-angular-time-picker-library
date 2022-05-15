import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxAngurlarTimePickerLibComponent } from './ngx-angular-time-picker-lib/ngx-angular-time-picker-lib.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NgxAngurlarTimePickerLibComponent],
  imports: [CommonModule, MatIconModule],
  exports: [NgxAngurlarTimePickerLibComponent],
})
export class NgxAngularTimePickerLibraryModule {}
