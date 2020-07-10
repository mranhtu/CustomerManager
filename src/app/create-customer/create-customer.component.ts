import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink = 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService
  ) {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      age: ['', Validators.required ]
    });
  }

  ngOnInit(): void {
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(AvatarDialogComponent, {
  //     height: '400px',
  //     width: '400px',
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result){
  //       this.avatarLink = result.link;
  //     }
  //   });
  // }

  resetFields(){
    this.avatarLink = 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg';
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    this.firebaseService.createCustomer(value, this.avatarLink)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['/home']);
        }
      );
  }

}
