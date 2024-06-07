import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from './models/user/user-model';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Librería Plutón';
  isAdmin = false;

  profile: User | null = null;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.enableScrollToTopOnRouteChange();
    // this.changeNavbar();
  }

  getProfile() {
    this.authService.getProfileListener()
      .subscribe((user) => {
        this.profile = user;
        if (!this.profile) {
          this.isAdmin = false;
          return;
        }
        this.isAdmin = this.profile.is_staff;
        if (this.isAdmin) {
          this.router.navigate(['/admin']);
        }
      });
  }

  private enableScrollToTopOnRouteChange(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.elementRef.nativeElement.scrollIntoView();
      }
    });
  }

  // Update navbar for admin pages
  // private changeNavbar(): void {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.isAdmin = event.url.startsWith('/admin');
  //     }
  //   });
  // }
}
