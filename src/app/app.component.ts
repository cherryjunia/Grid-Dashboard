import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grid-dashboard';

  constructor(public auth : AuthService,
              private afAuth: AngularFireAuth){}

  ngOnInit() {

  }
  logout(){
this.auth.logout();
}



}
