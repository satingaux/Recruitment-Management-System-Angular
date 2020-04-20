import { Component, OnInit, RootRenderer } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ria';
  ipAddress: any;
  constructor(private afs: AngularFirestore,
              private http: HttpClient,
              private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    const splashScreen: HTMLElement = document.getElementById('splashScreenClass');
    if (splashScreen) {
       splashScreen.remove();
      }

    this.http.get<{ip: string}>('https://jsonip.com')
                    .subscribe( data => {
                      // console.log('th data', data);
                      this.afs.collection('track').doc(data.ip).collection('time_stamp').add({
                        time_stamp: new Date(),
                        deviceInfo: this.deviceService.getDeviceInfo(),
                        isMobile: this.deviceService.isMobile(),
                        isTablet: this.deviceService.isTablet(),
                        isDesktopDevice: this.deviceService.isDesktop(),
                      });
                    });

  }
}
