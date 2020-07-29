import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user: Observable<firebase.User>;
  userData: any;

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router) {
      this.user = afAuth.authState;
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('petrolAdmin', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('petrolAdmin'));
        } else {
          localStorage.setItem('petrolAdmin', null);
          JSON.parse(localStorage.getItem('petrolAdmin'));
        }
      });
    }


     // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('petrolAdmin'));
    return (user !== null) ? true : false;
  }

  // Returns true when user is looged in and email is verified
  isUserLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('petrolAdmin'));
      return (user !== null) ? true : false;
  }


  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }

  getSales(){
    return this.db.collection('sale').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar){
    // return this.db.collection('users').add({
    //   name: value.name,
    //   nameToSearch: value.name.toLowerCase(),
    //   surname: value.surname,
    //   age: parseInt(value.age),
    //   avatar: avatar
    // });
  }

  createSale(values) {
    return this.db.collection('sale').add({
      title: values.title,
      // tslint:disable-next-line:radix
      quantity: parseInt(values.quantity),
      // tslint:disable-next-line:radix
      price: parseInt(values.price),
      // tslint:disable-next-line:radix
      expense: parseInt(values.expense),
      date: values.date,
    });
  }


   // Sign in with email/password
   SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
      // .then((result) => {
      //   console.log(' result them ', result);
      //   //  this.router.navigate(['<!-- enter your route name here -->']);
      //   return result;
      // }).catch((error) => {
      //   window.alert(error.message);
      // });
  }



  logout() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('petrolAdmin');
      this.router.navigate(['login']);
    })
  }

}
