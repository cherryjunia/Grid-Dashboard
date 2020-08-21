import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grid-dashboard';

  constructor(public auth : AuthService){}

  ngOnInit() {

  }
  logout(){
this.auth.logout();
}
}
