import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddInterviewRoundDialogComponent } from '../add-interview-round-dialog/add-interview-round-dialog.component';
import { EditInterviewRoundDialogComponent } from '../edit-interview-round-dialog/edit-interview-round-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-status-report-dialog',
  templateUrl: './status-report-dialog.component.html',
  styleUrls: ['./status-report-dialog.component.css']
})
export class StatusReportDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<StatusReportDialogComponent>,
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {}
  userDetailsForm = false;
  interviewers = null;
  interviews = null;
  feedbacks = null;
  updatedstatus = '';
  displayedColumns: string[] = ['Tech', 'Rating', 'comment'];
  expandedElement: null;
  report = {
    interviewer: null,
    date: '',
    scheduledTime: '',
    comment: '',
    candidate: null,
  };

  // ////////////////////////////////////////////////////////////////////////////////////
  time = {hour: 13, minute: 30};

  form: FormGroup;

  // chart_data = new google.visualization.DataTable();

  title  = 'Visualisation';
  type = 'ColumnChart';
  feedbackObj = [];
  feedbackObjJSON = {};
  histogram_columnames = [];

  ngOnInit() {
    this.form = this.formBuilder.group({
      time_stamp: Date(),
      interviewer: [null, [Validators.required]],
      date: [null, [Validators.required]],
      scheduledTime: [null, [Validators.required]],
      comment: [null],
    });

    this.afs.collection('interviewers').valueChanges().subscribe(interviewers => {
      this.interviewers = interviewers;
    });
    this.afs.collection('candidates').doc(this.data.candidate.email).collection('interviews').valueChanges().subscribe(interviews => {
      this.interviews = interviews;
    });
    this.afs.collection('interviews', ref => ref.where('candidate.email', '==', this.data.candidate.email)).valueChanges()
    .subscribe(
      feedbacks => {
        this.feedbacks = feedbacks;
        feedbacks.forEach( (e: any) => {
          e.interview_Date_Time = moment.unix(e.interview_Date_Time.seconds).format("MMMM Do YYYY, h:mm:ss a");
        });
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  addInterviewRound(candidate) {
    this.afs.collection('candidates').doc(this.data.candidate.email).collection('interviews').add(this.report).then((docRef) => {
        this.afs.collection('candidates').doc(this.data.candidate.email).collection('interviews').doc(docRef.id).update({
          docId: docRef.id,
          time_stamp: Date(),
        });
        alert('Interview Round is success fully added');
        console.log('Interview Round is success fully added');
        this.report.candidate = candidate;
        this.afs.collection('interviews').add(this.report).then((docRef => {
          this.afs.collection('interviews').doc(docRef.id).update({
            docId: docRef.id
          });
        }));
        this.form.reset();
      }).catch((e) => {
        alert(e + ' error in submitting interview round details Try Again');
        console.log(e + ' error in submitting interview round details Try Again');
      });
  }

  removeInterviewRound(interview, feedback) {
    if (confirm('Are you sure to delete ' + interview.docId)) {
       this.afs.collection('candidates').doc(this.data.candidate.email).collection('interviews').doc(interview.docId).delete().then(() => {
        console.log(interview.name + ' successfully deleted');
      });
       this.afs.collection('interviews').doc(feedback.docId).delete().then(() => {
        console.log(' Feddback is successfully deleted');
      });
    } else {
      console.log('you denied the permission');
    }
  }

  updateStatus(candidate) {
    this.afs.collection('candidates').doc(candidate.email).update({
      status: this.updatedstatus,
    })
    .then(() => {
        this.dialogRef.close();
        console.log('Status is successfully updated!');
    }).catch(e => {
      alert('error in updating ' + e);
      console.log('error in updating ' + e);
    });
  }

  removeCandidate(candidate) {
    if (confirm('Are you sure to reject ' + candidate.name + '\nAn email of rejection will be automatically sent to the candidate.')) {


      this.afs.collection('candidates').doc(candidate.email).delete().then(() => {
        console.log(candidate.name + ' successfully deleted');
      }).then(() => {
        this.dialogRef.close();
        // let interviewsdocId;

        //  retriving docid of the current candidate inside the interviews
        // this.afs.collection('interviews', ref => ref.where('candidate.email', '==', candidate.email)).valueChanges()
        // .subscribe(interviews => {
        //   interviews.forEach((interview: any) => {
        //     interviewsdocId = interview.docId;
        //   });
        // });
        // this.afs.collection('candidates').doc(candidate.email).update({
        //   removed: true,
        // });
        // this.afs.collection('interviews').doc(interviewsdocId).update({
        //   // candidate.removed: true,
        });
    } else {
      console.log('you denied the permission');
    }
  }


  drawHistogram(interview) {
    this.feedbackObj = [];
    this.histogram_columnames = [];
    interview.feedback.forEach(element => {
      this.feedbackObj.push([element.tech, Number(element.rating)]);
    });
    this.histogram_columnames.push('Technology');
    this.histogram_columnames.push('Rating');

    console.log(this.feedbackObj);
  }

  addAnotherInterviewRound(data) {
    const dialogRef = this.dialog.open(AddInterviewRoundDialogComponent, {
      width: '460px',
      maxHeight: '620px',
      data: {
        data
        // timestamp: Date(),
        // status: 'feedbackPending',
      }
    });
  }

  editInterview(interview_arg) {
    const dialogRef = this.dialog.open(EditInterviewRoundDialogComponent, {
      width: '460px',
      maxHeight: '620px',
      data: {
        interview_arg
        // timestamp: Date(),
        // status: 'feedbackPending',
      },
    });

  }


}
