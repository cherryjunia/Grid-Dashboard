import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  action : 'login' | 'SignUp' = 'login';
  constructor(private afAuth : AngularFireAuth,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm){
    this.loading = true;
    const { email , password , firstName , lastName } = form.value;
    let resp;
  try {
    if (this.isSignUp) {
    resp = await this.afAuth.createUserWithEmailAndPassword(email,password);
    await resp.user.updateProfile({ displayName: `${firstName} ${lastName}`});
    await this.auth.createUserDocument();
    form.reset();
    } else{
     resp = await this.afAuth.signInWithEmailAndPassword(email, password)
    }

    const uid = resp.user.uid;
    this.router.navigate([`/profile/${uid}`]);
  } catch (error) {
       alert(error.message);
    }

  this.loading = false;
  }

get isLogin(){
  return this.action === 'login'
}
get isSignUp(){
  return this.action === 'SignUp'
}

}
