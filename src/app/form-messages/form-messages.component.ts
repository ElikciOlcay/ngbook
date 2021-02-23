import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'bm-form-messages',
  templateUrl: './form-messages.component.html',
  styleUrls: ['./form-messages.component.css']
})
export class FormMessagesComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() controlName: string;

  constructor() { }

  private allMessages = {
    title: {
      required: 'Ein Buchtitel muss angegeben werden'
    },
    isbn: {
      required: 'Es muss eine ISBN angegeben werden',
      minLength: 'Die ISBN muss mindesten 10 Zeichen haben',
      maxLength: 'Die ISBN darf maximal 13 Zeichen haben'
    },
    published: {
      required: 'Es muss ein Erscheinungsdatum angegeben werden'
    },
    authors: {
      required: 'Ess muss ein Autor angegeben werden'
    }
  };

  ngOnInit(): void {
  }

  errorsForControl(): string[] {
    const messages = Object.keys(this.allMessages);
  }



}
