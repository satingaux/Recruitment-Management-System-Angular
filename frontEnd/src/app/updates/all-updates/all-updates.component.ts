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
        profile: 'Tech Lead',
      },
      activity: {
        title: 'Email',
        // desc: 'email from Jhanvi',
        msg: 'This is the email send by Bhumika',
      }
    },
    {
      candidate: {
        id: '7623u45298476234',
        isMarkedWithFlag: false,
        name: 'Bhumika Pruthi',
        time: '9:00 pm',
        profile: 'Tech Lead',
      },
      activity: {
        title: 'Email',
        // desc: 'email from Jhanvi',
        msg: 'This is the email send by Bhumika',
      }
    },
    {
      candidate: {
        id: '7623u45298476234',
        isMarkedWithFlag: false,
        name: 'Bhumika Pruthi',
        time: '9:00 pm',
        profile: 'Tech Lead',
      },
      activity: {
        title: 'Email',
        // desc: 'email from Jhanvi',
        msg: 'This is the email send by Bhumika',
      }
    },
    {
      candidate: {
        id: '7623u45298476234',
        isMarkedWithFlag: false,
        name: 'Bhumika Pruthi',
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
