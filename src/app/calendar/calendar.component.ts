import { CalendarService } from './calendar.service';
import { Component, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';
import { Event } from './event';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {

  dateForm: any;
  newEventForm: any;

  isCalendarOpen = false;
  isEventFormOpen = true;
  tabTitle = 'Events';
  iconListener: any;
  subscription = new Subscription();
  eventsData: Observable<Event[]>;

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private cdref: ChangeDetectorRef,
    private calendarService: CalendarService,
  ) {



  }

  ngOnInit() {
    const today = moment().format('MM/DD/YYYY').toLocaleString();
    console.log(today);
    this.eventsData = this.calendarService.getAllEvents();

    this.dateForm = this.fb.group({
      date: [today, Validators.required]
    });

    this.newEventForm = this.fb.group({
      startTime: ['', [Validators.required
      , Validators.max(23), Validators.min(0)]],
      endTime: ['', [Validators.required
      , Validators.max(23), Validators.min(0)]],
      title: ['', [Validators.required]],
      subject: ['', [Validators.required]],
    });

    this.onChanges();
  }


  ngAfterViewInit() {
    const calendarIcon = this.el.nativeElement.querySelector('[title="Toggle datepicker"]');
    // calendarIcon.click();

    this.iconListener = calendarIcon.addEventListener('click', this.toggleCalendar.bind(this));
    console.log(this.isCalendarOpen, this.isEventFormOpen);
    this.cdref.detectChanges();
  }

  private toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;
    this.tabTitle = this.isCalendarOpen ? 'Calendar' : 'Events';
  }

  onChanges(): void {
    const subscricption = this.dateForm.get('date').valueChanges
      .subscribe(val => {

        this.isCalendarOpen = !this.isCalendarOpen;
        this.tabTitle = this.isCalendarOpen ? 'Calendar' : 'Events';

        console.log('EVentsData', this.eventsData);
      });
    this.subscription.add(subscricption);
  }

  onCreateNewEventClick() {
    this.isEventFormOpen = false;
    this.isCalendarOpen = false;

  }

  onCancelEventSave() {
    this.isEventFormOpen = true;
    this.isCalendarOpen = false;
  }

  onEventSave() {
    const newEventToAdd = {
      date: moment(this.dateForm.value.date).format('MM/DD/YYYY'),
      completed: false,
      ... this.newEventForm.value
    };

    this.calendarService.addEvent(newEventToAdd);
    this.newEventForm.reset();
    this.onCancelEventSave();
  }


  onMarkCompleted(event) {
    this.calendarService.toggleCompleted(event);
  }

  onEditEvent(event) {
    this.isEventFormOpen = false;
    this.isCalendarOpen = false;
    this.onCancelEvent(event);
    this.newEventForm.patchValue({
      ...event
    });
  }

  onCancelEvent(event: Event) {
    this.calendarService.deleteEvent(event);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.iconListener.removeEventListener();
  }

}
