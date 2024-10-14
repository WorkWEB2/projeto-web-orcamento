import { Component } from '@angular/core';
import { NavbarUserComponent } from '../../global_components/navbar-user/navbar-user.component';
import { HeaderHomeComponent } from '../../global_components/header-home/header-home.component';
import { OrdersTableComponent } from '../../global_components/orders-table/orders-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarUserComponent, HeaderHomeComponent, OrdersTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
