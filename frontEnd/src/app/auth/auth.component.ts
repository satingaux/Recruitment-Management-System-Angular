import { Component, OnInit, Injectable } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AuthComponent implements OnInit, CanActivate {

  constructor(public firebaseService: FirebaseService,
              private router: Router) { }

  ngOnInit() {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.firebaseService.isLoggedIn()) {
      this.router.navigate(['auth']);
    }
    return true;
  }

  loginWithGoogle() {
    this.firebaseService.signWithGoogle();
  }

  signOut() {
    this.firebaseService.signOut();
  }

}
