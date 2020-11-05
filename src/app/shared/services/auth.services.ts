import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { Injectable, NgZone } from '@angular/core';
// import { User } from '../services/user'; // for saving user in FireStorage
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userData: any;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone
    ) {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                this.router.navigate(['user-info']);
            } else {
                localStorage.setItem('user', null);
                this.router.navigate(['sign-in']);
            }
        })
    }

    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword (email, password)
            .then((result) => {
                this.ngZone.run(() =>{
                    this.router.navigate(['user-info'])
                })
            }).catch((error) => {
                window.alert(error.message);
            })
    }

    FacebookLogin() {
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        return this.afAuth.signInWithPopup(provider)
        .then((result) => {
                this.router.navigate(['user-info']);
            }).catch((error) => {
                window.alert(error.message);
            });
        
    }

    SignUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            this.ngZone.run(() => {
                this.router.navigate(['user-info'])
            })
        }).catch((error) => {
            window.alert(error.message);
        })
    }

    
    SignOut() {
        this.afAuth.user
        console.log (this.afAuth.user);
        return this.afAuth.signOut()
        .then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['sign-in']);
        })
    }
    
    
    get isLoggedIn() : boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null) ? true : false; 
    }
    
    // SaveUserInFirestore(user: User)
    // {
    //     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
    //     const userData: User = {
    //         id: user.id,
    //         email: user.email,
    //         displayName: user.displayName,
    //         photoURL: user.photoURL
    //     }
    //     return userRef.set(userData, {
    //         merge: true
    //     })
    // }

}