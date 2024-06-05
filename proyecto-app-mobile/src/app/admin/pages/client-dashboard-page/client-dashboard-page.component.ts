import { Component, OnInit } from '@angular/core';
import { UserBasicInfoDTO } from 'src/app/models/user/user-model';
import { UserDashboardService } from '../../services/user/user-dashboard.service';

@Component({
  selector: 'app-client-dashboard-page',
  templateUrl: './client-dashboard-page.component.html',
  styleUrls: ['./client-dashboard-page.component.css']
})
export class ClientDashboardPageComponent implements OnInit {

  users: UserBasicInfoDTO[] = [];
  name = '';

  constructor(
    private UserService: UserDashboardService
  ) { }

  ngOnInit(): void {
    this.UserService.getUsers()
      .subscribe((result: UserBasicInfoDTO[]) => {
        this.users = result;
      });
  }

  onClickSearch(){

  }
}
