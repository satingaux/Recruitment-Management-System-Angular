import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HrComponent } from './hr/hr.component';
import { DemoMaterialModule } from './material-module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { AddComponent, DialogAdd } from './add/add.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {RatingModule} from 'primeng/rating';
import { BannerComponent } from './banner/banner.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule} from 'primeng/calendar';
import { AddInterviewRoundDialogComponent } from './hr/add-interview-round-dialog/add-interview-round-dialog.component';
import { EditInterviewRoundDialogComponent } from './hr/edit-interview-round-dialog/edit-interview-round-dialog.component';
import { StatusReportDialogComponent } from './hr/status-report-dialog/status-report-dialog.component';
import { GoogleChartComponent } from './google-chart/google-chart.component';
import { AllInterviewsListComponent } from './all-interviews-list/all-interviews-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UpdatesComponent } from './updates/updates.component';
import { SideNavUpdatesComponent } from './updates/side-nav-updates/side-nav-updates.component';
import { AuthComponent } from './auth/auth.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ChatsComponent } from './updates/chats/chats.component';
import { AllUpdatesComponent } from './updates/all-updates/all-updates.component';

import { CovalentCommonModule, CovalentLayoutModule, CovalentMediaModule, CovalentExpansionPanelModule,
  CovalentStepsModule, CovalentLoadingModule, CovalentDialogsModule, CovalentSearchModule, CovalentPagingModule,
  CovalentNotificationsModule, CovalentMenuModule, CovalentDataTableModule, CovalentMessageModule } from '@covalent/core';

@NgModule({
  declarations: [
    AppComponent,
    HrComponent,
    AddComponent,
    DialogAdd,
    BannerComponent,
    AddInterviewRoundDialogComponent,
    EditInterviewRoundDialogComponent,
    StatusReportDialogComponent,
    GoogleChartComponent,
    AllInterviewsListComponent,
    SideNavComponent,
    UpdatesComponent,
    SideNavUpdatesComponent,
    AuthComponent,
    ToolbarComponent,
    ChatsComponent,
    AllUpdatesComponent,
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    FormsModule,
    RatingModule,
    GoogleChartsModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    CalendarModule,
    AppRoutingModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule, // dynamically imports firebase/analytics
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule
  ],
  entryComponents: [AddComponent, DialogAdd, HrComponent, StatusReportDialogComponent, AddInterviewRoundDialogComponent, EditInterviewRoundDialogComponent],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
  exports: [AppComponent],
  // bootstrap: [NgbdTimepickerBasic]
})
export class AppModule { }


// firebase deploy --only hosting:riaadvisory
//     "site": "riaadvisory",
// "site": "recruitmentmanagement",
// firebase deploy --only hosting:recruitmentmanagement
