import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-updates',
  templateUrl: './all-updates.component.html',
  styleUrls: ['./all-updates.component.css']
})
export class AllUpdatesComponent implements OnInit {

  updates = [
    {
      candidate: {
        id: '12313452353464645',
        isMarkedWithFlag: true,
        name: 'Sachin Sharma',
        time: '7:00 am',
        profile: 'Software Engineer',
      },
      activity: {
        title: 'Schedule Interview',

      }
    },
    {
      candidate: {
        id: '7623u45298476234',
        isMarkedWithFlag: true,
        name: 'Bhumika Pruthi',
        time: '9:00 pm',
        profile: 'Business Lead',
      },
      activity: {
        title: 'Email Attachment',
        // desc: 'email from Jhanvi',
        msg: 'This is the email send by Bhumika',
      }
    },
    {
      candidate: {
        id: '7623u45298476234',
        isMarkedWithFlag: false,
        name: 'Rohan Kumar',
        time: '9:00 pm',
        profile: 'Design Lead',
      },
      activity: {
        title: 'Confirmation',
        // desc: 'email from Jhanvi',
        msg: 'This is the email send by Bhumika',
      }
    },
    {
      candidate: {
        id: '7623u45298476234',
        isMarkedWithFlag: false,
        name: 'Jaydeep Sangwaan',
        time: '9:00 pm',
        profile: 'Tech Intern',
      },
      activity: {
        title: 'Acceptance',
        // desc: 'email from Jhanvi',
        msg: 'This is the email send by Bhumika',
      }
    },
    {
      candidate: {
        id: '7623u45298476234',
        isMarkedWithFlag: false,
        name: 'Samuel Sharma',
        time: '9:00 pm',
        profile: 'Tech Lead',
      },
      activity: {
        title: 'Email',
        // desc: 'email from Jhanvi',
        msg: 'This is the email send by Bhumika',
      }
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
