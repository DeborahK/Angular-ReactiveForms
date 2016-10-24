import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Customer } from './customer'

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup;
    customer: Customer= new Customer();

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: '',
            lastName: '',
            email: '',
            sendCatalog: true
        });
    }

    save() {
        console.log("Saved: ");
    }
 }
