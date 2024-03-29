import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../shared/book';
import { BookExistsValidatorService } from '../shared/book-exists-validator.service';
import { BookValidators } from '../shared/book-validators';
import { Thumbnail } from '../../shared/thumbnail';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnChanges {
  bookForm: FormGroup;
  @Output() submitBook = new EventEmitter<Book>();
  @Input() book: Book;
  @Input() editing = false;


  constructor(private fb: FormBuilder, private bookExistValidator: BookExistsValidatorService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
    this.setFormValues(this.book);
  }

  submitForm(): void {
    const formValue = this.bookForm.value;
    const isbn = this.editing ? this.book.isbn : formValue.isbn;
    const authors = formValue.authors.filter((author: any) => author !== null);
    const thumbnails = formValue.thumbnails.filter((thumbnail: { url: string; }) => thumbnail.url);
    const newBook: Book = {
      ...formValue,
      isbn,
      authors,
      thumbnails
    };
    this.submitBook.emit(newBook);
    this.bookForm.reset();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.bookForm) { return; }
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: [{value: '', disabled: this.editing}, [
        Validators.required,
        BookValidators.isbnFormat
      ],
      this.editing ? null : [this.bookExistValidator]
      ],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([
        { title: '', url: ''}
      ]),
      published: []
    });
  }

  private buildAuthorsArray(values: string[]): FormArray {
    return this.fb.array(values, Validators.required);
  }

  private buildThumbnailsArray(values: Thumbnail[]): FormArray {
    return this.fb.array(values.map(t => this.fb.group(t)));
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }

  addAuthorControl(): void {
    this.authors.push(this.fb.control(''));
  }

  addThumbnailControl(): void {
    this.thumbnails.push(this.fb.group({ title: '', url: ''}));
  }

  private setFormValues(book: Book): void {
    this.bookForm.patchValue(book);

    this.bookForm.setControl(
      'authors',
      this.buildAuthorsArray(book.authors)
    );

    this.bookForm.setControl(
      'thumbnails',
      this.buildThumbnailsArray(book.thumbnails ?? [])
    );

  }

}
