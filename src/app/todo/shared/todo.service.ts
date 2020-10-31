import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private firebaseDb: AngularFirestore) { }

  getToDoList(){
  	return this.firebaseDb.collection('titles').snapshotChanges();
  }
  
  addToDoList(title: string){
  	return this.firebaseDb.collection('titles').add({title: title, isChecked: false});
  }

  checkOrUncheckedTitle($key: string, flag: boolean, title: string){
  	console.log(title, $key, flag);
  	return this.firebaseDb.collection('titles').doc($key).set({isChecked: flag, title: title});
  }

  removeTitle($key: string){
  	return this.firebaseDb.collection('titles').doc($key).delete();
  	// this.toDoList.remove($key);
  }
}
