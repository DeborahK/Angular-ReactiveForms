import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


import { Customer } from './customer';

@Component({
  selector: 'app-customer-reactive',
  templateUrl: './customer-reactive.component.html',
  styleUrls: ['./customer-reactive.component.css']
})
export class CustomerReactiveComponent implements OnInit {
  customer = new Customer();
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group(
      {
        firstName: '', // 写法 1
        lastName: {value: 'n/a', disabled: true},// 写法 2
        email: [{value: '', disabled: false}],// 写法 3
        sendCataLog: [true]               // 写法 3
      }
    )
    /* this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCataLog: new FormControl(true)
    }); */
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ', this.customerForm);
  }

  setValue() {
    this.customerForm.setValue(
      {
        firstName:'zhangsan',
        lastName: "wang",
        email:'123@qq.com',
        sendCataLog: false
      }
    )
  }

  patchValue() {
    this.customerForm.patchValue(
      {
        firstName:'lisi',
        lastName: "zhang"
      }
    )
  }
}
