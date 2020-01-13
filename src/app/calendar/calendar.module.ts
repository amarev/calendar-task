import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { ClarityModule } from '@clr/angular';
import { FilterEventsByDatePipe } from './filter-events-by-date.pipe';



@NgModule({
  declarations: [CalendarComponent, FilterEventsByDatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
  ],
  exports: [
    CalendarComponent,
  ]
})
export class CalendarModule { }
