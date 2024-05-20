import { Component, OnInit } from '@angular/core';
import { Publisher } from 'src/app/models/publisher/publisher-model';
import { PublisherDashboardService } from '../../services/publisher/publisher-dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublisherFormComponent } from './publisher-form/publisher-form.component';

@Component({
  selector: 'app-publisher-dashboard-page',
  templateUrl: './publisher-dashboard-page.component.html',
  styleUrls: ['./publisher-dashboard-page.component.css']
})
export class PublisherDashboardPageComponent implements OnInit {

  publishers: Publisher[] = [];

  constructor(
    private modalService: NgbModal,
    private publisherService: PublisherDashboardService
  ) { }

  ngOnInit() {
    this.getPublishers();
  }

  getPublishers() {
    this.publisherService.getAllPublishers()
      .subscribe((result: Publisher[]) => {
        this.publishers = this.publisherService.oderPublishersByAuthorNameAsc(result);
      });
  }

  onCreatePublisher() {
    const modalRef = this.modalService.open(PublisherFormComponent, { size: 'md', centered: true })
      .result.then((result: boolean) => {
        console.log('res', result);
        if (!result) {
          return;
        }
        this.getPublishers();
      }, () => {
        return;
      });
  }

  onEditPublisher(id: number) {
    const modalRef = this.modalService.open(PublisherFormComponent, { size: 'md', centered: true })
    modalRef.componentInstance.action = 'edit';
    modalRef.componentInstance.publisherId = id;

    modalRef.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      this.getPublishers();
    }, () => {
      return;
    });
  }

  onDeletePublisher(id: number) {
    const modalRef = this.modalService.open(PublisherFormComponent, { size: 'md', centered: true })
    modalRef.componentInstance.action = 'delete';
    modalRef.componentInstance.publisherId = id;

    modalRef.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      this.getPublishers();
    }, () => {
      return;
    });
  }

}
