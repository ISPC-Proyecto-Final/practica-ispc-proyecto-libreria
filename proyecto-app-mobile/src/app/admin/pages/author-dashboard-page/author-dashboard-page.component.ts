import { Component } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author } from 'src/app/models/author/author-model';
import { AuthorDashboardService } from '../../services/author/author-dashboard.service';
import { AuthorFormComponent } from './author-form/author-form.component';

@Component({
  selector: 'app-author-dashboard-page',
  templateUrl: './author-dashboard-page.component.html',
  styleUrls: ['./author-dashboard-page.component.css']
})
export class AuthorDashboardPageComponent {

  authors: Author[] = [];
  name = '';

  constructor(
    private modalService: NgbModal,
    private authorService: AuthorDashboardService
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.getAllAuthors()
      .subscribe((result: Author[]) => {
        this.authors = this.authorService.oderAuthorsByAuthorNameAsc(result);
      });
  }

  onCreateAuthor() {
    const modalRef = this.modalService.open(AuthorFormComponent, { size: 'md', centered: true })
      .result.then((result: boolean) => {
        console.log('res', result);
        if (!result) {
          return;
        }
        this.getAuthors();
      }, () => {
        return;
      });
  }

  onEditAuthor(id: number) {
    const modalRef = this.modalService.open(AuthorFormComponent, { size: 'md', centered: true })
    modalRef.componentInstance.action = 'edit';
    modalRef.componentInstance.authorId = id;

    modalRef.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      this.getAuthors();
    }, () => {
      return;
    });
  }

  onDeleteAuthor(id: number) {
    const modalRef = this.modalService.open(AuthorFormComponent, { size: 'md', centered: true })
    modalRef.componentInstance.action = 'delete';
    modalRef.componentInstance.authorId = id;

    modalRef.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      this.getAuthors();
    }, () => {
      return;
    });
  }

  onClickSearch(){

  }
}
