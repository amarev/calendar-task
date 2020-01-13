import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from './event';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  // private  events: BehaviorSubject<List<Event>> = new BehaviorSubject(List([]));
  private  events: BehaviorSubject<Event[]> = new BehaviorSubject([
    {
      date: moment().format('MM/DD/YYYY').toLocaleString(),
      startTime: 2,
      endTime: 3,
      title: 'Title 1',
      subject: 'Subject 1',
      completed: true
    },
    {
      date: moment().format('MM/DD/YYYY').toLocaleString(),
      startTime: 3,
      endTime: 4,
      title: 'Title 2',
      subject: 'Subject 2',
      completed: false
    }
  ]);

  constructor() { }

  getAllEvents(): Observable<Event[]> {
    return this.events.asObservable();
  }

  addEvent(event: Event) {
    const sortedEvents = [...this.events.value, event]
      .sort(this.compareFunc);
    return this.events.next(sortedEvents);
  }

  toggleCompleted(event: Event) {
    event.completed = !event.completed;
    const index = this.findEventIndex(event);

    return this.events.next(Object.assign([], [...this.events.value], {index: event}));
  }

  deleteEvent(event: Event) {
    const updatedEvents = [...this.events.value].filter(el =>
      el.date !== event.date ||
      el.startTime !== event.startTime ||
      el.endTime !== event.endTime ||
      el.title !== event.title ||
      el.subject !== event.subject
    );
    return this.events.next(updatedEvents);
  }

  findEventIndex(event: Event): number {
    return [...this.events.value].findIndex(el =>
      el.date === event.date &&
      el.startTime === event.startTime &&
      el.endTime === event.endTime &&
      el.title === event.title &&
      el.subject === event.subject
    );
  }

  compareFunc(a, b) {
    if ( new Date(a.date).getTime() <  new Date(b.date).getTime()) {
      return -1;
    } else if (new Date(a.date).getTime() >  new Date(b.date).getTime()) {
      return 1;
    } else {
      return a.startTime - b.startTime;
    }
   }

}
