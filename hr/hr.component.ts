import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { SnackbarService } from '../snackbar.service';
import { AddInterviewRoundDialogComponent } from './add-interview-round-dialog/add-interview-round-dialog.component';
import { EditInterviewRoundDialogComponent } from './edit-interview-round-dialog/edit-interview-round-dialog.component';
import { StatusReportDialogComponent } from './status-report-dialog/status-report-dialog.component';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit {
  constructor(private afs: AngularFirestore,
              private dialog: MatDialog,
              private snackbarService: SnackbarService) { }
  private showLoader = true;
  activeStatus = 'all';
  activeProfile = 'all';
  displayedColumns: string[] = ['profile', 'name', 'experience', 'email', 'contactnumber', 'status', 'resume', 'export', 'archive'];
  datasource: any;
  interviews = [];

  selectedChip = {
    all: true,
    frontend: false,
    fullstack: false,
    backend: false,
    other: false,
  };

  selectedStatusChip = {
    all: true,
    interviewing: false,
    onhold: false,
    selected: false,
    archived: false,
  };

  selected = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.afs.collection('candidates', ref => ref.where('status', '>', 'archived')).valueChanges().subscribe(candidates => {
      // console.log(candidates);
      // candidates.forEach((e: any) => {
      //   if (e.profile === 'rejected') {
      //     console.log(e);
      //   }
      // })
      this.datasource = new MatTableDataSource(candidates);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.showLoader = false;
    });
    this.afs.collection('interviews').valueChanges().subscribe(interviews => {
      this.interviews = interviews;
    });
  }

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  // EMAIL to candidate of Rejection
  removeCandidate(candidate) {
    if (confirm('Are you sure to reject ' + candidate.name + '\nAn email of rejection will be automatically sent to the candidate.')) {


      this.afs.collection('candidates').doc(candidate.email).delete().then(() => {
        console.log(candidate.name + ' successfully deleted');
        this.showLoader = false;
      }).then(() => {
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

  orderBy(param) {
    this.activeProfile = param;
    if ( param === 'all' ) {
        this.ngOnInit();
    } else {
      if (this.activeStatus !== 'all') {
          this.afs.collection('candidates', ref => ref
          .where('profile', '==', param)
          .where('status', '==', this.activeStatus)).valueChanges()
          .subscribe((resp) => {
            this.datasource = resp;
            this.showLoader = false;
            console.log(resp);
          });
      } else {
          this.afs.collection('candidates', ref => ref
          .where('profile', '==', param)).valueChanges()
          .subscribe((resp) => {
            this.datasource = resp;
            this.showLoader = false;
            console.log(resp);
          });
      }
    }
    this.selectedChip.all = false;
    this.selectedChip.frontend = false;
    this.selectedChip.fullstack = false;
    this.selectedChip.backend = false;
    this.selectedChip.other = false;

    this.selectedChip[param] = true;
  }

  orderByStatus(param) {
    this.activeStatus = param;
    if ( param === 'all' ) {
        this.ngOnInit();
    } else {
      if (this.activeProfile !== 'all') {
        this.afs.collection('candidates', ref => ref
        .where('status', '==', param)
        .where('profile', '==', this.activeProfile)).valueChanges()
        .subscribe((resp) => {
          this.datasource = resp;
          this.showLoader = false;
          console.log(resp);
        });
      } else {
          this.afs.collection('candidates', ref => ref
          .where('status', '==', param)).valueChanges()
          .subscribe((resp) => {
            this.datasource = resp;
            this.showLoader = false;
            console.log(resp);
          });
      }
    }
    this.selectedStatusChip.all = false;
    this.selectedStatusChip.interviewing = false;
    this.selectedStatusChip.onhold = false;
    this.selectedStatusChip.selected = false;
    this.selectedStatusChip.archived = false;

    this.selectedStatusChip[param] = true;
  }

  archiveCandidate(candidate) {
    if (confirm('Are you sure to archive ' + candidate.name)) {
      this.afs.collection('candidates').doc(candidate.email).update({
        status: 'archived',
      })
      .then(() => {
        this.ngOnInit();
        this.showLoader = false;
        this.snackbarService.openSnackBar(candidate.name + ' is archived', 'close');
        console.log('Status is successfully updated!');
      }).catch(e => {
        alert('error in updating ' + e);
        console.log('error in updating ' + e);
      });
    }
  }

  showReport(candidate) {
    const dialogRef = this.dialog.open(StatusReportDialogComponent, {
      width: '650px',
      maxHeight: '620px',
      data: {
        timestamp: Date(),
        status: 'feedbackPending',
        candidate,
      },
    });
  }

  exportData(candidate) {
    alert('Export Service requires container credentials');
  }

}



