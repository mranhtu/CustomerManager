import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('customers').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('customers').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('customers').doc(userKey).delete();
  }

  getCustomers(){
    return this.db.collection('customers').snapshotChanges();
  }

  searchCustomers(searchValue){
    return this.db.collection('customers',ref => ref.where('phone', '>=', searchValue)
      .where('phone', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchCustomersByAge(value){
    return this.db.collection('customers',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createCustomer(value, avatar){
    return this.db.collection('customers').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }
}
