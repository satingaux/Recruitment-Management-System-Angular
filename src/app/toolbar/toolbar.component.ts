import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  searchText = '';
  sidenav;
  toggleSearch: boolean = false;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.sidenav = this.firebaseService.sidenav;
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
