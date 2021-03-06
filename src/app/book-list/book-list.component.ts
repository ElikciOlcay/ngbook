import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  errorMessage: string;

  constructor(private bs: BookStoreService) { }


  ngOnInit(): void {
    this.bs.getAll().subscribe(
      res => this.books = res,
      err => this.errorMessage = 'Http Fehler'
      );
  }



}
