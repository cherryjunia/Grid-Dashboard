import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserProfile } from '../core/user.profile.model'
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private router: Router,
            private afAuth : AngularFireAuth,
            private afs: AngularFirestore) { }

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['']);
  }

  async createUserDocument(){
    //get the user
      const user = this.afAuth.currentUser;
    //create the object with new data
      const userProfile: UserProfile ={
        uid : (await user).uid,
        email: (await user).email,
        name: (await user).displayName,
        address: '',
        city: '',
        state:'',
        zip: '',
        phone: '',
        specialty: '',
        ip: ''
      }
    // write to the cloud firestore
    return this.afs.doc(`users/${(await user).uid}`).set(userProfile);
  }

}
