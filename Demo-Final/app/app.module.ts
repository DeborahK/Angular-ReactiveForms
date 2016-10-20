import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { SignupComponent }  from './signup/signup.component';

@NgModule({
  imports: [ 
              BrowserModule,
              FormsModule
           ],
  declarations: [ AppComponent, SignupComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
