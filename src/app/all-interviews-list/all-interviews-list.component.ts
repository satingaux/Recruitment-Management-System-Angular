import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { MatDialog } from '@angular/material/dialog/typings/public-api';
import { SnackbarService } from '../snackbar.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-all-interviews-list',
  templateUrl: './all-interviews-list.component.html',
  styleUrls: ['./all-interviews-list.component.css']
})
export class AllInterviewsListComponent implements OnInit {
  selectedStatusforInterviews = '';
  datasource: any;
  user: any;
  emailOfInterviewer;
  interviewsUpdated;
  // emailOfInterviewer = this.user.email;
  prof = null;
  feedbackDone = null;
  // tslint:disable-next-line: variable-name
  interviews = null;
  interviewer = null;
  selectedChip = {
    all: true,
    feedbackDone: false,
    feedbackPending: false
  };

  message = 'Feedback Already Submitted';
  action = 'Thanks';
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['profile', 'name', 'experience', 'email', 'contactnumber', 'Date/Time', 'resume', 'feedback'];
  constructor(private afs: AngularFirestore,
              // private dialog: MatDialog,
              private snackbarservice: SnackbarService) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {

  this.afs.collection('interviews', ref => ref.where('interview_Date_Time', '>', new Date()).orderBy('interview_Date_Time', 'asc')).valueChanges()
    .subscribe(
      interviews => {
        this.interviews = interviews;
        console.log(interviews);
        interviews.forEach( (e: any) => {
          e.interview_Date_Time = moment.unix(e.interview_Date_Time.seconds).format('MMMM Do YYYY, h:mm:ss a');
        });
        const a = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.interviews.length; i++) {
          a.push({name: this.interviews[i].candidate.name,
                  profile: this.interviews[i].candidate.profile,
                  experience: this.interviews[i].candidate.experience,
                  email: this.interviews[i].candidate.email,
                  contactnumber: this.interviews[i].candidate.contactnumber,
                  resume: this.interviews[i].candidate.resumeurl,
                  interview_Date_Time: this.interviews[i].interview_Date_Time,
                  status: this.interviews[i].candidate.status,
                  feedbackStatus: this.interviews[i].feedbackStatus,
                  docId: this.interviews[i].docId} );
      }

        this.datasource = new MatTableDataSource( a );
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
    });

  this.afs.collection('interviewers').valueChanges().subscribe( interviewer => {
      this.interviewer = interviewer;
      this.prof = this.interviewer.profile;
      return console.log(this.prof);
      });

  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();

    // tslint:disable-next-line: align
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
  orderBy(param) {
    if ( param === 'all' ) {
        this.ngOnInit();
    } else {
    // tslint:disable-next-line: max-line-length
    this.afs.collection('interviews', ref => ref.where('status', '==', param).where('interviewer.email', '==', this.emailOfInterviewer)).valueChanges().subscribe((resp) => {
      this.interviewsUpdated = resp;
      const b = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < resp.length; i++) {
        b.push({name: this.interviewsUpdated[i].candidate.name,
                profile: this.interviewsUpdated[i].candidate.profile,
                experience: this.interviewsUpdated[i].candidate.experience,
                email: this.interviewsUpdated[i].candidate.email,
                contactnumber: this.interviewsUpdated[i].candidate.contactnumber,
                resume: this.interviewsUpdated[i].candidate.resumeurl,
                interview_Date_Time: this.interviews[i].interview_Date_Time,
                status: this.interviewsUpdated[i].candidate.status,
                feedbackStatus: this.interviewsUpdated[i].status,
                docId: this.interviewsUpdated[i].docId} );
    }
      this.datasource = new MatTableDataSource( b );
      console.log(resp);
      });
    }
    this.selectedChip.all = false;
    this.selectedChip.feedbackDone = false;
    this.selectedChip.feedbackPending = false;

    this.selectedChip[param] = true;
  }

  showReport(candidate) {
    this.feedbackDone = null;
    for (const i in this.interviews) {
      if (this.interviews[i].docId === candidate.docId && this.interviews[i].feedback) {
        this.feedbackDone = this.interviews[i].docId.feedback;
        console.log(candidate.docId);
      }
    }
    if (this.feedbackDone !== null) {
      this.snackbarservice.openSnackBar(this.message, this.action);
    } else {
      // const dialogRef = this.dialog.open(dialogFeedback, {
      //   width: '600px',
      //   height: '500px',
      //   data: {
      //     timestamp: Date(),
      //     candidate,
      //   },
      // });
    }
  }

  orderInterviewsByStatus(status) {
    if (status === 'toBeInterviews') {
      this.ngOnInit();
    } else if (status === 'outDatedInterviews') {
      this.afs.collection('interviews', ref => ref.where('interview_Date_Time', '<', new Date())
          .orderBy('interview_Date_Time', 'asc')).valueChanges()
          .subscribe(
            interviews => {
              this.interviews = interviews;
              console.log(interviews);
              interviews.forEach( (e: any) => {
                e.interview_Date_Time = moment.unix(e.interview_Date_Time.seconds).format('MMMM Do YYYY, h:mm:ss a');
              });
              const a = [];
              // tslint:disable-next-line: prefer-for-of
              for (let i = 0; i < this.interviews.length; i++) {
                a.push({name: this.interviews[i].candidate.name,
                        profile: this.interviews[i].candidate.profile,
                        experience: this.interviews[i].candidate.experience,
                        email: this.interviews[i].candidate.email,
                        contactnumber: this.interviews[i].candidate.contactnumber,
                        resume: this.interviews[i].candidate.resumeurl,
                        interview_Date_Time: this.interviews[i].interview_Date_Time,
                        status: this.interviews[i].candidate.status,
                        feedbackStatus: this.interviews[i].feedbackStatus,
                        docId: this.interviews[i].docId} );
            }

              this.datasource = new MatTableDataSource( a );
              this.datasource.paginator = this.paginator;
              this.datasource.sort = this.sort;
          });
    } else {
      this.snackbarservice.openSnackBar('Under development :)', 'close');
    }
  }
}
