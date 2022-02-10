import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  customerForm : FormGroup;
  
  
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName:'',
      secondName:'',
      email:'',
      sentToCatalog: true
 
    });
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
  getTestData():void{
    this.customerForm.setValue({
      firstName :'firstName',
      secondName: 'secondName',
      email:'yuxin.tong@adelaide.edu.au',
      sentToCatalog: true

    })
  }
}
