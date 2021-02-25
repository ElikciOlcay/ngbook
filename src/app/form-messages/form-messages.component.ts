import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, NgModel } from '@angular/forms';

@Component({
  selector: 'bm-form-messages',
  templateUrl: './form-messages.component.html',
  styleUrls: ['./form-messages.component.css']
})
export class FormMessagesComponent implements OnInit {

  @Input() control: AbstractControl | null;
  @Input() controlName: string;

  constructor() { }

  private allMessages = {
    title: {
      required: 'Ein Buchtitel muss angegeben werden'
    },
    isbn: {
      required: 'Es muss eine ISBN angegeben werden',
      minlength: 'Die ISBN muss mindesten 10 Zeichen haben',
      maxlength: 'Die ISBN darf maximal 13 Zeichen haben'
    },
    published: {
      required: 'Es muss ein Erscheinungsdatum angegeben werden'
    },
    author: {
      required: 'Ess muss ein Autor angegeben werden'
    }
  };

  ngOnInit(): void {
  }

  errorsForControl(): string[] {
    const messages = (this.allMessages as any)[this.controlName];
    if (this.control !== null) {
      if (!this.control.errors  || !this.control.dirty) {
        return [];
      }
      return Object.keys(this.control.errors).map(err => messages[err]);
    }
    return [];
  }
}
