
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, AbstractControl, ValidatorFn,  } from '@angular/forms';

import { Customer } from './customer';




// function valiateRating (c: AbstractControl) :{[key:string]:boolean} | null{  
//   if(c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)){
//        return {['range']:true};  // true means add into error collections
//      }
//      return null;
//     }


function valiateRating(min:number, max:number) : ValidatorFn{
return (c: AbstractControl) :{[key:string]:boolean} | null =>{  
  if(c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)){
       return {['range']:true};  // true means add into error collections
     }
     return null;
    };
  }
  
  function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const emailControl = c.get('email');
    const confirmControl = c.get('confirmEmail');
    console.log("confirmControl value = " + confirmControl.value);
    if (emailControl.pristine || confirmControl.pristine) {
      console.log('pristine');
      return null;
    }
  
    if (emailControl.value === confirmControl.value) {
      console.log('compare value');
      return null;
    }
    return {'wrongEmail':true};
  }

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
      firstName:['',[Validators.required, Validators.minLength(3)]],
      secondName:['',[Validators.required,Validators.maxLength(50)]],
      emailGroup : this.fb.group({
        email:['',[Validators.required,Validators.email]],
        confirmEmail:['',[Validators.required]],
      },{validator: emailMatcher}),
      phone:'',
      notification:'email',
      rating:[null,valiateRating(1,5)],
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
  sendNotification(nofication:string) :void{
    const phoneControl = this.customerForm.get('phone');
    if(nofication==='text'){
      phoneControl.setValidators([Validators.required,Validators.
        pattern('^(\\+\\d{2}[ \\-]{0,1}){0,1}(((\\({0,1}[ \\-]{0,1})0{0,1}\\){0,1}[2|3|7|8]{1}\\){0,1}[ \\-]*(\\d{4}[ \\-]{0,1}\\d{4}))|(1[ \\-]{0,1}(300|800|900|902)[ \\-]{0,1}((\\d{6})|(\\d{3}[ \\-]{0,1}\\d{3})))|(13[ \\-]{0,1}([\\d \\-]{5})|((\\({0,1}[ \\-]{0,1})0{0,1}\\){0,1}4{1}[\\d \\-]{8,10})))$')]);
    }else{
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity(); //When you add or remove a validator at run time,
  }


}


