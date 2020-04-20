import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { SnackbarService } from '../../snackbar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-interview-round-dialog',
  templateUrl: './edit-interview-round-dialog.component.html',
  styleUrls: ['./edit-interview-round-dialog.component.css']
})
export class EditInterviewRoundDialogComponent implements OnInit {

  form: FormGroup;
  interviewers: any;
  interviews: any;
  roundReport = {
    time_stamp: Date(),
    mode: '',  //online or offline
    tech_or_hr: '',
    interviewer: [][10],
    interview_Date_Time: '',
    comment: '',
  };

  constructor(
    private dialogRef: MatDialogRef<EditInterviewRoundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.data);
    this.roundReport = {
      time_stamp: Date(),
      mode: this.data.interview_arg.mode,  //online or offline
      tech_or_hr:  this.data.interview_arg.tech_or_hr,
      interviewer:  this.data.interview_arg.interviewer,
      interview_Date_Time:  '',
      comment: this.data.interview_arg.comment,
    };

    this.form = this.formBuilder.group({
      time_stamp: Date(),
      mode: [null, [Validators.required]],  //online or offline
      tech_or_hr: [null, [Validators.required]],
      interviewer: [null, [Validators.required]],
      interview_Date_Time: [null, [Validators.required]],
      comment: [null],
    });

    this.afs.collection('interviewers').valueChanges().subscribe(interviewers => {
      this.interviewers = interviewers;
    });
    this.afs.collection('candidates').doc(this.data.interview_arg.candidate.email)
            .collection('interviews').valueChanges().subscribe(interviews => {
      this.interviews = interviews;
    });
  }

  updateInterviewRound(candidate) {
    console.log(this.data.interview_arg);
    this.afs.collection('candidates').doc(candidate.email)
            .collection('interviews').doc(this.data.interview_arg.c_docId)
            .update({
              mode: this.roundReport.mode,  //online or offline
              tech_or_hr: this.roundReport.tech_or_hr,
              interviewer: this.roundReport.interviewer,
              interview_Date_Time: this.roundReport.interview_Date_Time,
              comment: this.roundReport.comment,
            }).then(() => {
                console.log('Interview Round is success fully Updated to Candidate List');
                this.afs.collection('interviews').doc(this.data.interview_arg.i_docId).update({
                  mode: this.roundReport.mode,  //online or offline
                  tech_or_hr: this.roundReport.tech_or_hr,
                  interviewer: this.roundReport.interviewer,
                  interview_Date_Time: this.roundReport.interview_Date_Time,
                  comment: this.roundReport.comment,
              }).then(() => {
                this.form.reset();
                this.dialogRef.close();
                this.snackbarService.openSnackBar('Interview Round Updated Successfully', 'close');
              });
    }).catch((e) => {
      this.snackbarService.openSnackBar(e + ' error in updating interview round details Try Again', 'close');
      console.log(e + ' error in updating interview round details Try Again');
    });
  }

}
