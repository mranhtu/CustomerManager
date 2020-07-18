import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import {Observable, Subject, combineLatest} from 'rxjs';

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

  //search by name
  startAt = new Subject();
  endAt = new Subject();

  startObs = this.startAt.asObservable();
  endObs = this.endAt.asObservable();

  obs = new Observable();

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
    combineLatest(this.startObs, this.endObs).subscribe((value) => {
      this.firebaseService.searchCustomersByName(value[0].toString().toLocaleLowerCase(), value[1].toString().toLocaleLowerCase()).subscribe((res) => {
        // this.items = res;
        console.log(res)
      })
    })
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

  searchByName($event){
    let querySearch = $event.target.value;
    this.startAt.next(querySearch);
    this.endAt.next(querySearch + "\uf8ff");
    // const value = this.searchValue.toLowerCase();
    // this.firebaseService.searchCustomersByName(value)
    //   .subscribe(result => {
    //     this.nameFilteredItems = result;
    //     this.items = this.combineLists(result, this.ageFilteredItems);
    //   });
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
