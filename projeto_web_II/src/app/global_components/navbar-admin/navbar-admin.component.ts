import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss'],
})
export class NavbarAdminComponent {
  constructor(private router: Router) {}

  isActive(url: string): boolean {
    return this.router.url.includes(url);
  }
}
