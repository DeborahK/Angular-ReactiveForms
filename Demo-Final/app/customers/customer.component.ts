import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { Customer } from './customer';

function ratingRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl):
        { [key: string]: boolean } | null => {
        if (c.value &&
            (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    };
}

function emailMatcher(c: AbstractControl) {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');

    if (emailControl.pristine || confirmControl.pristine) {
        return null;
    }

    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
}

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup;
    customer: Customer = new Customer();
    emailMessage: string;

    private validationMessages = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    };

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: [null, [Validators.required, Validators.minLength(3)]],
            lastName: [null, [Validators.required, Validators.maxLength(50)]],
            emailGroup: this.fb.group({
                email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: [null, Validators.required]
            }, { validator: emailMatcher }),
            phone: null,
            notification: 'email',
            sendCatalog: true,
            rating: [null, ratingRange(1, 5)]
        });

        this.customerForm.get('notification').valueChanges.subscribe(value => {
            this.setNotification(value);
        });

        let emailControl = this.customerForm.get('emailGroup.email');
        emailControl.valueChanges.subscribe(value => {
            this.setMessage(emailControl);
        });
    }

    save(): void {
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    setMessage(c: AbstractControl) {
        this.emailMessage='';
        if ((c.touched || c.dirty) &&
            c.errors) {
            for (let key in c.errors) {
                if (c.errors.hasOwnProperty(key)) {
                    this.emailMessage += this.validationMessages[key];
                }
            }
        }
    }

    setNotification(notifyVia: string): void {
        let phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }
}
