import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {
  cur_date: Date;
  hrs;
  msg;
  dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  constructor() { }

  ngOnInit() {
    this.cur_date = new Date();
    this.hrs = this.cur_date.getHours();
    if (this.hrs >=  0) { this.msg = 'Early morning'; } // REALLY early
    if (this.hrs >=  6) { this.msg = 'Good morning'; }      // After 6am
    if (this.hrs >= 12) { this.msg = 'Good afternoon'; }    // After 12pm
    if (this.hrs >= 17) { this.msg = 'Good evening'; }      // After 5pm
    // if (this.hrs >= 22) { this.msg = 'Good night!'; }        // After 10pm
  }

}
