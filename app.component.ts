import { Component, OnInit, RootRenderer } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ria';
  ngOnInit() {
    const splashScreen: HTMLElement = document.getElementById('splashScreenClass');
    if (splashScreen) {
       splashScreen.remove();
      }

    // setTimeout(function(){
    //   const splashScreen: HTMLElement = document.getElementById('splashScreenClass');
    //   const approot: HTMLElement = document.getElementById('root');
    //   if (splashScreen) {
    //     splashScreen.remove();
    //   }
    //  }, 3000);

  }
}
