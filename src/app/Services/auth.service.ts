import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,private router: Router) { }

  login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => console.log('Logged in:', result))
      .catch(error => {
        throw error;
      });
  }
  loadUser(){
    this.afAuth.authState.subscribe(user =>{
    localStorage.setItem('user',JSON.stringify(user));
});
}     

}
