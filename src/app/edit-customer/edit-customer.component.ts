import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';

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
      { type: 'required', message: 'Tên khách hàng không được phép bỏ trống' }
    ],
    phone: [
      { type: 'required', message: 'Điện thoại không được phép bỏ trống' }
    ],
    soDo: [
      { type: 'required', message: 'Số đo không được phép bỏ trống' },
    ]
  };

  constructor(public firebaseService: FirebaseService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required ],
      phone: [this.item.phone, Validators.required ],
      birth: [this.item.birth],
      address: [this.item.address],
      orderName: [this.item.order_name],
      price: [this.item.price],
      soDo: [this.item.so_do, Validators.required ]
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
    console.log("submit à")
    this.firebaseService.updateUser(this.item.id, param).then(
        res => {
          this.router.navigate(['/home']);
        }
      );
  }

  confirmDialog(value) {
    if (confirm('Are you sure to delete ')) {
      this.delete(value);
    }
  }

  delete(value){
    const param = {
      name: value.name,
      phone: value.phone,
      birth: value.birth,
      address: value.address,
      order_name: value.orderName,
      price: value.price,
      so_do: value.soDo,
      create_date: new Date(),
      status: 0
    };
    this.firebaseService.deleteCustomer(this.item.id, param).then(
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
