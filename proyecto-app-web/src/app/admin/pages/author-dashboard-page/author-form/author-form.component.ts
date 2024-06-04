import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthorDashboardService } from 'src/app/admin/services/author/author-dashboard.service';
import { Author, createAuthorDTO } from 'src/app/models/author/author-model';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent {


  @Input() authorId: string | number = '';
  @Input() action: 'create' | 'edit' | 'delete' = 'create';

  newAuthor!: createAuthorDTO;
  authorForm!: FormGroup;
  author!: Author;

  isDeleteForm: boolean = false

  errorMessages = {
    name: [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'maxlength', message: 'Por favor ingresá un máximo de 80 caracteres.' }
    ],}


  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authorService: AuthorDashboardService,
  ) { }

  ngOnInit(): void {
    this.isDeleteForm = this.action === 'delete';

    this.createForm();

    if (this.authorId) {
      this.getAuthorById();
    }
  }

  getAuthorById() {
    this.authorService.getAuthorById(this.authorId)
      .subscribe((result: Author) => {
        this.author = result;
        this.authorForm.get('name')?.setValue(this.author.name);
      });
  }

  onSaveHandle(event: Event) {
    event.preventDefault;
    this.authorForm.markAllAsTouched();

    if (this.action === 'create') {
      this.saveNewAuthor();
    }

    if (this.action === 'edit') {
      this.saveUpdateAuthor();
    }
  }

  saveNewAuthor() {

    this.newAuthor = {
      name: this.authorForm.value.name as string,
    }

    this.authorService.saveAuthor(this.newAuthor)
      .subscribe((result: Author) => {
        let author: Author = result;

        if (author) {
          this.activeModal.close(true);
        }
      });
  }

  saveUpdateAuthor() {

    this.author.name = this.authorForm.value.name as string;

    this.authorService.updateAuthor(this.author)
      .subscribe((result: Author) => {
        let author: Author = result;

        if (author) {
          this.activeModal.close(true);
        }
      });
  }

  onConfirmDelete() {
    this.authorService.deleteAuthor(this.authorId)
      .subscribe(() => {
        this.activeModal.close(true);
      });

  }

  onClose() {
    this.activeModal.close(false);
  }

  createForm() {
    this.authorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(80)]]
    });
  }

  get name() {
    return this.authorForm.get('name');
  }
}
