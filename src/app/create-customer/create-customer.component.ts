import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';
import {ToastrService} from 'ngx-toastr';
import {StringUtils} from '../services/const';

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
    public firebaseService: FirebaseService,
    private toastr: ToastrService,
    private stringUtils: StringUtils
  ) {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      phone: ['', Validators.required ],
      birth: [''],
      address: [''],
      orderName: [''],
      price: [''],
      daiAo: [''],
      daiTay: [''],
      bapTay: [''],
      vongNguc: [''],
      haNguc: [''],
      vongEo: [''],
      haEo: [''],
      vongMong: [''],
      daiQuan: [''],
      vongCo: [''],
      kieuCo: [''],
      note: [''],

    });
  }

  ngOnInit(): void {
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    const keywordFullName = this.stringUtils.createKeywords(value.name);

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
      querySearch: keywordFullName,
      status: 1
    };
    console.log(param);
    this.firebaseService.createCustomer(param).then(res => {
          this.resetFields();
      this.toastr.success('Thành công', 'Thêm mới khách hàng thành công');
          this.router.navigate(['/home']);
        }
    );
  }
  cancel(){
    this.router.navigate(['/home']);
  }
}
