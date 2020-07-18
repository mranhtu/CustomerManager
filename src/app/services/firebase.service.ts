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

  deleteCustomer(key, value){
    return this.db.collection('customers').doc(key).set(value);
  }

  getCustomers(){
    return this.db.collection('customers', ref => ref.where('status', '==', 1)).snapshotChanges();
  }

  searchCustomersByPhone(searchValue){
    return this.db.collection('customers',ref => ref.where('phone', '>=', searchValue)
      .where('phone', '<=', searchValue + '\uf8ff')
      .where('status', '==', 1))
      .snapshotChanges();
  }
  //
  // searchCustomersByName(searchValue){
  //   return this.db.collection('customers',ref => ref.where('name', '>=', searchValue)
  //     .where('name', '<=', searchValue + '\uf8ff')
  //     .where('status', '==', 1))
  //     .snapshotChanges();
  // }

  searchCustomersByName(start, end) {
    return this.db.collection('customers', ref => ref.limit(4).orderBy('name').startAt(start).endAt(end)).valueChanges();
  }

  getAllByName() {
    return this.db.collection('customers', ref => ref.orderBy('name')).valueChanges();
  }

  searchCustomersByAge(value){
    return this.db.collection('customers',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createCustomer(param){
    return this.db.collection('customers').add(param);
  }
}
