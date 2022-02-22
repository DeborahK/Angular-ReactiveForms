import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';


import { Customer } from './customer';

@Component({
  selector: 'app-customer-reactive',
  templateUrl: './customer-reactive.component.html',
  styleUrls: ['./customer-reactive.component.css']
})
export class CustomerReactiveComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]], 
        lastName:  ['', [Validators.required, Validators.maxLength(50)]], 
        email: ['', [Validators.required, Validators.email]], 
        sendCataLog: true,
        phone: '',
        notification: 'email'            
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

  setNotificationType(type: string): void{
    const phoneControl = this.customerForm.get('phone')
    if(type === 'phone') {
      phoneControl?.setValidators(Validators.required)
      // phoneControl?.setValidators([Validators.required])
    }else if(type ==='email') {
      phoneControl?.clearValidators()
    }
    phoneControl?.updateValueAndValidity()
  }
}
