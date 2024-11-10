import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.scss',
})
export class NavbarUserComponent {
  constructor(private router: Router) {}

  isActive(url: string): boolean {
    return this.router.url.includes(url);
  }
}
