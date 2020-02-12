import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../snackbar.service';

@Component({
  selector: 'app-add-interview-round-dialog',
  templateUrl: './add-interview-round-dialog.component.html',
  styleUrls: ['./add-interview-round-dialog.component.css']
})
export class AddInterviewRoundDialogComponent implements OnInit {

  form: FormGroup;
  interviewers: any;
  interviews: any;
  roundReport = {
    c_docId: '',
    c_time_stamp: '',
    i_docId: '',
    i_time_stamp: '',
    feedbackStatus: 'feedbackPending',
    time_stamp: Date(),
    mode: '',  //online or offline
    tech_or_hr: '',
    interviewer: '',
    interview_Date_Time: '',
    comment: '',
    candidate: [],
  };

  constructor(
    private dialogRef: MatDialogRef<AddInterviewRoundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.data);
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
    this.afs.collection('candidates').doc(this.data.data.candidate.email)
            .collection('interviews').valueChanges().subscribe(interviews => {
      this.interviews = interviews;
    });
  }

  addInterviewRound(candidate) {
    console.log(this.roundReport);
    console.log(candidate);
    this.afs.collection('candidates').doc(candidate.email).collection('interviews').add(this.roundReport).then((docRef) => {
      this.roundReport.c_docId = docRef.id,
      this.roundReport.c_time_stamp = Date(),
      this.afs.collection('candidates').doc(candidate.email).collection('interviews').doc(docRef.id).update({
        c_docId: this.roundReport.c_docId,
        c_time_stamp: this.roundReport.c_docId,
      }).then(() => {
        console.log('Interview Round is success fully added to Candidate List');
        this.roundReport.candidate = candidate;
        this.afs.collection('interviews').add(this.roundReport).then((docRef => {
          this.roundReport.i_docId = docRef.id,
          this.roundReport.i_time_stamp = Date(),
          this.afs.collection('interviews').doc(docRef.id).update({
            i_docId: this.roundReport.i_docId,
            i_time_stamp: this.roundReport.i_time_stamp,
          });
        }));
      }).then(() => {
        this.form.reset();
        this.dialogRef.close();
        this.snackbarService.openSnackBar('Interview Round Added Successfully', 'close');
      });
    }).catch((e) => {
      this.snackbarService.openSnackBar(e + ' error in submitting interview round details Try Again', 'close');
      console.log(e + ' error in submitting interview round details Try Again');
    });
  }


}
