import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateValueAccessorModule } from 'angular-date-value-accessor';


import { AdminRoutingModule } from './admin-routing.module';

import { BookFormComponent } from './book-form/book-form.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { FormMessagesComponent } from './form-messages/form-messages.component';
import { EditBookComponent } from './edit-book/edit-book.component';


@NgModule({
  declarations: [
    BookFormComponent,
    CreateBookComponent,
    FormMessagesComponent,
    EditBookComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DateValueAccessorModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
