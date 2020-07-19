import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ageValue = 0;
  searchValue = '';
  searchNameValue = '';
  items: Array<any>;
  ageFilteredItems: Array<any>;
  nameFilteredItems: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public db: AngularFirestore
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getCustomers()
      .subscribe(result => {
        this.items = result;
        this.ageFilteredItems = result;
        this.nameFilteredItems = result;
      });
  }

  searchByPhone(){
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchCustomersByPhone(value)
      .subscribe(result => {
        this.nameFilteredItems = result;
        this.items = this.combineLists(result, this.ageFilteredItems);
      });
  }

  async searchByName($event) {
    let querySearch = $event.target.value;
    this.firebaseService.searchCustomersByName(querySearch)
      .subscribe(result => {
        this.items = this.combineLists(result, this.ageFilteredItems);
      });
  }

  combineLists(a, b){
    const result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

  rangeChange(event){
    this.firebaseService.searchCustomersByAge(event.value)
      .subscribe(result => {
        this.ageFilteredItems = result;
        this.items = this.combineLists(result, this.nameFilteredItems);
      });
  }

  viewDetails(item){
    this.router.navigate(['/details/' + item.payload.doc.id]);
  }

}
