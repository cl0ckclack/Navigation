// import { BrowserModule } from '@angular/platform-browser';
// import { ErrorHandler, NgModule } from '@angular/core';
// import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';

// import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
// import { OnePage } from '../pages/one/one';

// import { AboutPage } from '../pages/about/about';
// import { TabsPage } from '../pages/tabs/tabs';

// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';

// var config = {
//   apiKey: "AIzaSyDFDrJrXglMEd8pybtPIYFiK1RO44UtL24",
//   authDomain: "webdata-50ff5.firebaseapp.com",
//   databaseURL: "https://webdata-50ff5.firebaseio.com",
//   projectId: "webdata-50ff5",
//   storageBucket: "webdata-50ff5.appspot.com",
//   messagingSenderId: "988338740230"
// };

// @NgModule({
//   declarations: [
//     MyApp,
//     HomePage,
//     OnePage,
//     AboutPage,
//     TabsPage
//   ],
//   imports: [
//     BrowserModule,
//     IonicModule.forRoot(MyApp),
//     AngularFireDatabaseModule,
//     AngularFireModule.initializeApp(config)
//   ],
//   bootstrap: [IonicApp],
//   entryComponents: [
//     MyApp,
//     HomePage,
//     OnePage,
//     AboutPage,
//     TabsPage
//   ],
//   providers: [
//     StatusBar,
//     SplashScreen,
//     {provide: ErrorHandler, useClass: IonicErrorHandler}
//   ]
// })
// export class AppModule {}



import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
// import { BusPage } from '../pages/bus/bus';
import { BusPage } from '../pages/buss/home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OnePage } from '../pages/one/one';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


var config = {
  apiKey: "AIzaSyDFDrJrXglMEd8pybtPIYFiK1RO44UtL24",
  authDomain: "webdata-50ff5.firebaseapp.com",
  databaseURL: "https://webdata-50ff5.firebaseio.com",
  projectId: "webdata-50ff5",
  storageBucket: "webdata-50ff5.appspot.com",
  messagingSenderId: "988338740230"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    OnePage,
    BusPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    OnePage,
    BusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
