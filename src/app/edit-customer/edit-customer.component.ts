import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  exampleForm: FormGroup;
  item: any;

  validationMessages = {
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    surname: [
      { type: 'required', message: 'Surname is required.' }
    ],
    age: [
      { type: 'required', message: 'Age is required.' },
    ]
  };

  constructor(public firebaseService: FirebaseService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      surname: [this.item.surname, Validators.required],
      age: [this.item.age, Validators.required]
    });
  }

  onSubmit(value){
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    this.firebaseService.updateUser(this.item.id, value)
      .then(
        res => {
          this.router.navigate(['/home']);
        }
      );
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
      .then(
        res => {
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
        }
      );
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
