import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import {Location} from '@angular/common';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book$: Observable<Book>;
  zoomSize = 'large';

  constructor(
    private bs: BookStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    // tslint:disable-next-line: no-non-null-assertion
    this.book$ = this.bs.getSingle(params.get('isbn')!);
  }

  getRating(num: number): any[] {
    return new Array(num);
  }

  removeBook(book: Book): void {
    if (confirm('Buch wirklich löschen?')) {
      this.bs.remove(book.isbn).subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}));
    }
  }

  goBack(): void {
    this.location.back();
  }




}
