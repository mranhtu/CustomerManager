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
      daiAo: [this.item.daiAo],
      daiTay: [this.item.daiTay],
      bapTay: [this.item.bapTay],
      vongNguc: [this.item.vongNguc],
      haNguc: [this.item.haNguc],
      vongEo: [this.item.vongEo],
      haEo: [this.item.haEo],
      vongMong: [this.item.vongMong],
      daiQuan: [this.item.daiQuan],
      vongCo: [this.item.vongCo],
      kieuCo: [this.item.kieuCo],
      note: [this.item.note],
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
      daiAo: value.daiAo,
      daiTay: value.daiTay,
      bapTay: value.bapTay,
      vongNguc: value.vongNguc,
      haNguc: value.haNguc,
      vongEo: value.vongEo,
      haEo: value.haEo,
      vongMong: value.vongMong,
      daiQuan: value.daiQuan,
      vongCo: value.vongCo,
      kieuCo: value.kieuCo,
      note: value.note,
      create_date: new Date(),
      status: 1
    };
    this.firebaseService.updateUser(this.item.id, param).then(
        res => {
          this.router.navigate(['/home']);
        }
      );
  }

  confirmDialog(value) {
    if (confirm('Bạn có chắc muốn xóa? ')) {
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
      daiAo: value.daiAo,
      daiTay: value.daiTay,
      bapTay: value.bapTay,
      vongNguc: value.vongNguc,
      haNguc: value.haNguc,
      vongEo: value.vongEo,
      haEo: value.haEo,
      vongMong: value.vongMong,
      daiQuan: value.daiQuan,
      vongCo: value.vongCo,
      kieuCo: value.kieuCo,
      note: value.note,
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
