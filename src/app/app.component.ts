import { FirebaseService } from './services/firebase.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-firebase-crud';

  constructor(
    public fbs: FirebaseService) { }


  logoutClick() {
    console.log(' logoutClick ');
    this.fbs.logout();
  }
}
