import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Book, CreateBookDto } from 'src/app/models/book/book-model';
import { BookDashboardService } from 'src/app/admin/services/book/book-dashboard.service';
import { Author } from 'src/app/models/author/author-model';
import { Publisher } from 'src/app/models/publisher/publisher-model';
import { AuthorDashboardService } from 'src/app/admin/services/author/author-dashboard.service';
import { PublisherDashboardService } from 'src/app/admin/services/publisher/publisher-dashboard.service';
import { GenreDashboardService } from 'src/app/admin/services/genre/genre-dashboard.service';
import { Genre } from 'src/app/models/genre/genre-model';
import { map } from 'rxjs/operators'
import { regExOnlyNumbers } from 'src/app/utils/regex/regex';
import { ToastService } from 'src/app/services/utils/toast.service';



@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Input() bookId!: number;
  @Input() action: 'view' | 'create' | 'edit' | 'delete' = 'create';

  book!: CreateBookDto;
  bookForm!: FormGroup;
  selectedGenres: number[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  genres: Genre[] = [];

  formEnable: boolean = true;
  isDeleteForm: boolean = false

  errorMessages = {
    isbn: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'Mínimo 10 dígitos' },
      { type: 'maxlength', message: 'Máximo 13 dígitos.' }
    ],
    title: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' },
    ],
    pageAmount: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'pattern', message: 'Ingresa sólo números.' }
    ],
    bookCover: [
      { type: 'required', message: 'Campo requerido.' }
    ],
    stock: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'pattern', message: 'Ingresa sólo números.' }
    ],
    releaseYear: [
      { type: 'required', message: 'Campo requerido.' },
    ],
    synopsis: [
      { type: 'required', message: 'Campo requerido.' },
    ],
    price: [
      { type: 'required', message: 'Campo requerido.' },
    ],
    tags: [
      { type: 'required', message: 'Campo requerido.' },
    ],
    author: [
      { type: 'required', message: 'Campo requerido.' },
    ],
    publisher: [
      { type: 'required', message: 'Campo requerido.' },
    ],
    genre: [
      { type: 'required', message: 'Campo requerido.' },
    ],
  };


  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private bookService: BookDashboardService,
    private authorService: AuthorDashboardService,
    private publisherService: PublisherDashboardService,
    private genreService: GenreDashboardService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.formEnable = this.action !== 'view';
    this.isDeleteForm = this.action === 'delete';

    this.createForm();
    this.getAuthors();
    this.getPublishers();
    this.getGenres();


    if (typeof this.bookId !== 'undefined') {
      this.getById();
    }
  }

  getById() {
    this.bookService.getBookById(this.bookId)
      .pipe(map((result: Book) => {
        this.bookForm.get('isbn')?.setValue(result.isbn);
        this.bookForm.get('title')?.setValue(result.title);
        this.bookForm.get('pageAmount')?.setValue(result.page_amount);
        this.bookForm.get('bookCover')?.setValue(result.book_cover);
        this.bookForm.get('stock')?.setValue(result.stock);
        this.bookForm.get('releaseYear')?.setValue(result.release_year);
        this.bookForm.get('synopsis')?.setValue(result.synopsis);
        this.bookForm.get('price')?.setValue(result.price);
        this.bookForm.get('tags')?.setValue(result.tags);
        this.bookForm.get('author')?.setValue(result.author.id_author);
        this.bookForm.get('publisher')?.setValue(result.publisher.id_publisher);
        this.bookForm.get('genre')?.setValue(result.genres[0]);
        this.bookForm.get('subscription')?.setValue(result.subscription);
      })).subscribe();
  }

  getGenres() {
    this.genreService.getAllGenres()
      .subscribe((result: Genre[]) => {
        this.genres = this.genreService.oderGenresByAuthorNameAsc(result);
      })
  }

  getAuthors() {
    this.authorService.getAllAuthors()
      .subscribe((result: Author[]) => {
        this.authors = this.authorService.oderAuthorsByAuthorNameAsc(result);
      });
  }

  getPublishers() {
    this.publisherService.getAllPublishers()
      .subscribe((result: Publisher[]) => {
        this.publishers = this.publisherService.oderPublishersByAuthorNameAsc(result);
      });
  }

  onSaveHandle(event: Event) {
    event.preventDefault;
    this.bookForm.markAllAsTouched();

    if (this.action === 'create') {
      this.saveNewBook();
    }

    if (this.action === 'edit') {
      this.saveUpdateBook();
    }

  }

  saveNewBook() {
    this.book = {
      isbn: this.bookForm.value.isbn as string,
      title: this.bookForm.value.title as string,
      page_amount: this.bookForm.value.pageAmount as number,
      book_cover: this.bookForm.value.bookCover as string,
      stock: this.bookForm.value.stock as number,
      release_year: this.bookForm.value.releaseYear as number,
      synopsis: this.bookForm.value.synopsis as string,
      price: this.bookForm.value.price as string,
      tags: this.bookForm.value.tags as string,
      author_id: this.bookForm.value.author as number,
      publisher_id: this.bookForm.value.publisher as number,
      genre_ids: [this.bookForm.value.genre as number],
      subscription: this.bookForm.value.subscription
    }

    this.bookService.saveBook(this.book)
      .subscribe((result: Book) => {
        let book: Book = result;
        if (book) {
          this.toastService.createToast({type: 'bg-success', delay: 2500, message: 'Registro de libro exitoso'});
          this.activeModal.close(true);
        }
      });
  }

  saveUpdateBook() {
    this.book = {
      isbn: this.bookForm.value.isbn as string,
      title: this.bookForm.value.title as string,
      page_amount: this.bookForm.value.pageAmount as number,
      book_cover: this.bookForm.value.bookCover as string,
      stock: this.bookForm.value.stock as number,
      release_year: this.bookForm.value.releaseYear as number,
      synopsis: this.bookForm.value.synopsis as string,
      price: this.bookForm.value.price as string,
      tags: this.bookForm.value.tags as string,
      author_id: this.bookForm.value.author as number,
      publisher_id: this.bookForm.value.publisher as number,
      genre_ids: [this.bookForm.value.genre as number],
      subscription: this.bookForm.value.subscription
    }

    this.bookService.updateBook(this.bookId, this.book)
      .subscribe((result: Book) => {
        let book: Book = result;
        if (book) {
          this.toastService.createToast({type: 'bg-success', delay: 2500, message: 'Modificación de libro exitosa'});
          this.activeModal.close(true);
        }
      });
  }

  onConfirmDelete() {
    this.bookService.deleteBook(this.bookId)
      .subscribe(() => {
        this.toastService.createToast({type: 'bg-success', delay: 2500, message: 'Baja de libro exitosa'});
        this.activeModal.close(true);
      });
  }


  onClose() {
    this.activeModal.close(false);
  }

  createForm() {
    this.bookForm = this.formBuilder.group({
      isbn: [{ value: '', disabled: !this.formEnable }, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      title: [{ value: '', disabled: !this.formEnable }, [Validators.required, Validators.maxLength(80)]],
      pageAmount: [{ value: '', disabled: !this.formEnable }, [Validators.required, Validators.pattern(regExOnlyNumbers)]],
      bookCover: [{ value: '', disabled: !this.formEnable }, [Validators.required]],
      stock: [{ value: '', disabled: !this.formEnable }, [Validators.required, Validators.pattern(regExOnlyNumbers)]],
      releaseYear: [{ value: '', disabled: !this.formEnable }, [Validators.required]],
      synopsis: [{ value: '', disabled: !this.formEnable }, [Validators.required]],
      price: [{ value: '', disabled: !this.formEnable }, [Validators.required]],
      tags: [{ value: '', disabled: !this.formEnable }, [Validators.required]],
      author: [{ value: '', disabled: !this.formEnable }, [Validators.required]],
      publisher: [{ value: '', disabled: !this.formEnable }, [Validators.required]],
      genre: [{ value: '', disabled: !this.formEnable }, [Validators.required]],
      subscription: [{ value: false, disabled: !this.formEnable }],
    });
  }

  get isbn() {
    return this.bookForm.get('isbn');
  }

  get title() {
    return this.bookForm.get('title');
  }

  get pageAmount() {
    return this.bookForm.get('pageAmount');
  }

  get bookCover() {
    return this.bookForm.get('bookCover');
  }

  get stock() {
    return this.bookForm.get('stock');
  }

  get releaseYear() {
    return this.bookForm.get('releaseYear');
  }

  get synopsis() {
    return this.bookForm.get('synopsis');
  }

  get price() {
    return this.bookForm.get('price');
  }

  get tags() {
    return this.bookForm.get('tags');
  }

  get author() {
    return this.bookForm.get('author');
  }

  get publisher() {
    return this.bookForm.get('publisher');
  }

  get genre() {
    return this.bookForm.get('genre');
  }
}
