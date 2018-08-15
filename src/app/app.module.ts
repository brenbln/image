import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Navbar } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LongPressModule } from 'ionic-long-press';
import { PopoverPage } from '../pages/home/home';
import { EditPage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopoverPage,
    EditPage
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LongPressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PopoverPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
