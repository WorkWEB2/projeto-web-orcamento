import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../global_components/navbar-admin/navbar-admin.component';
import { AdminOrdersTableComponent } from '../../global_components/admin-orders-table/admin-orders-table.component';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [NavbarAdminComponent, AdminOrdersTableComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss',
})
export class HomeAdminComponent {}
