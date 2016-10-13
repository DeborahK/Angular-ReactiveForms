import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SignupComponent }  from './signup/signup.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, SignupComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
