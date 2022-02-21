import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


import { Customer } from './customer';

@Component({
  selector: 'app-customer-reactive',
  templateUrl: './customer-reactive.component.html',
  styleUrls: ['./customer-reactive.component.css']
})
export class CustomerReactiveComponent implements OnInit {
  customer = new Customer();
  customerForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCataLog: new FormControl(true)
    });
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
