import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
  selector: 'bm-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book$: Observable<Book>;

  constructor(
    private bs: BookStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn') ?? ''),
      switchMap((isbn: string) => this.bs.getSingle(isbn))
    );
  }

  updateBook(book: Book): void {
    this.bs.update(book).subscribe(() => {
      this.router.navigate(
        ['../../..', 'books', book.isbn],
        {relativeTo: this.route}
      );
    });
  }

}
