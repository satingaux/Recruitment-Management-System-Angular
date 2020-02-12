import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { format } from 'url';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  newConfessionDialog(): void {
    const dialogRef = this.dialog.open(DialogAdd, {
      width: '480px',
      minHeight: '550px',
      data: {
        timestamp: Date(),
        name: '',
        email: '',
        contactnumber: '',
        experience: '',
        profile: '',
        resumeurl: '',
        status: '',
        removed: Boolean,
      },
    });
  }

}














// interface Candidate {
//   timestamp: string;
//   name: string;
//   email: string;
//   contactnumber: string;
//   experience: string;
//   profile: string;
//   resumeurl: string;
//   status: string;
// }

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialogadd',
  templateUrl: 'dialogadd.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogAdd implements OnInit {
  userDetailsForm = false;
  constructor(
    private dialogRef: MatDialogRef<DialogAdd>,
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage) {}

  form: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      time_stamp: Date(),
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      contactnumber: [null, [Validators.required]],
      experience: [null, [Validators.required]],
      profile: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submitCandidate() {
    this.data.removed = false;
    this.afs.collection('candidates').doc(this.data.email).set(this.data).then(() => {
      console.log('candidate is success fully added');
    }).catch((e) => {
      console.log(e + ' error in submitting candidate details Try Again');
    });
    this.dialogRef.close();
    // console.log('submit btn clicked' + this.data);
  }


  // tslint:disable-next-line:member-ordering
  file: File;
  // tslint:disable-next-line:member-ordering
  downloadURL: Observable<string>;
  // tslint:disable-next-line:member-ordering
  isUploading = false;
  getFile(event) {
    this.file = event.target.files[0];
  }
  uploadFile() {
    if (this.file) {
      const filePath = this.data.email + this.file.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.file);
      this.isUploading = true;
      task.snapshotChanges()
              .pipe( finalize(() => {
                                  this.downloadURL = fileRef.getDownloadURL(); // {{ downloadURL | async }}
                                  this.isUploading = false;
                                  this.downloadURL.subscribe(url => {
                                  this.data.resumeurl = url;
                                  console.log(this.data.resumeurl);
                                });
                              })
                          ).subscribe();
      } else {
        console.log('error in resume upload');
      }
  }

}
