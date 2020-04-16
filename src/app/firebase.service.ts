import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit {
  currentUser;
  sidenav;
  constructor(private afs: AngularFirestore,
              private router: Router,
              private afauth: AngularFireAuth) { }

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.currentUser = this.afauth.auth.currentUser;
  }

  signWithGoogle() {
    this.afauth.auth.signInWithRedirect(new auth.GoogleAuthProvider()).then(() => {
        alert("signed in successfull");
        this.router.navigate(['sidenav']);
      }).then((e) => {
        alert(e);
      });
  }

  signOut() {
    this.afauth.auth.signOut().then(() => {
      alert("signed out successfull");
      this.router.navigate(['auth']);
    });
  }

  isLoggedIn() {
    console.log((this.currentUser != null) ? false : true);
    return (this.currentUser != null) ? true : false;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
