import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Customer } from './customer';

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements AfterViewInit {
    @ViewChild(NgForm) entryForm: NgForm;

    customer: Customer= new Customer();

    ngAfterViewInit() {
        console.log(this.entryForm.form);
    }

    save() {
        console.log('Saved: ' + JSON.stringify(this.entryForm.value));
    }
 }
