import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  searchText = '';

  toggleSearch: boolean = false;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  openSearch() {
    this.toggleSearch = true;
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  signOut() {
    this.firebaseService.signOut();
  }

}
