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

  validationMessages = {
    name: [
      { type: 'required', message: 'Tên khách hàng không được phép bỏ trống' }
    ],
    phone: [
      { type: 'required', message: 'Điện thoại không được phép bỏ trống' }
    ],
    soDo: [
      { type: 'required', message: 'Số đo không được phép bỏ trống' },
    ]
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService
  ) {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      phone: ['', Validators.required ],
      birth: [''],
      address: [''],
      orderName: [''],
      price: [''],
      soDo: ['', Validators.required ]
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
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){


    const param = {
      name: value.name,
      phone: value.phone,
      birth: value.birth,
      address: value.address,
      order_name: value.orderName,
      price: value.price,
      so_do: value.soDo,
      create_date: new Date(),
      status: 1
    };
    console.log(param);
    this.firebaseService.createCustomer(param).then(res => {
          this.resetFields();
          this.router.navigate(['/home']);
        }
    );
  }

}
