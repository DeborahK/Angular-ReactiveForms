import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

function ratingRange(min: number, max: number): ValidatorFn {
  // 自定义的验证函数只能接受一个参数，而且必须是 AbstractControl
  return (c: AbstractControl): {[key: string]: boolean} | null => {
    if(c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)){
      return {'range': true};
    }
    return null;
  }
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl =  c.get("email");
  const confirmEmailContro =  c.get("confirmEmail");
  //如果用户尚未修改 UI 中的值，则该控件 pristine（原始状态）为 true。
  if( emailControl?.pristine || confirmEmailContro?.pristine) {
    return null;
  }
  if (emailControl?.value !== confirmEmailContro?.value) {
    return { match: true};
  }
  return null;
}

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
        emailGroup: this.fb.group({
          email: ['', [Validators.required, Validators.email]], 
          confirmEmail: ['', [Validators.required]],
        },{validator: emailMatcher}),
        sendCataLog: true,
        phone: '',
        notification: 'email',
        // rating: [null, [Validators.max(5), Validators.min(1)]],
        rating: [null, ratingRange(1, 5)]       
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
