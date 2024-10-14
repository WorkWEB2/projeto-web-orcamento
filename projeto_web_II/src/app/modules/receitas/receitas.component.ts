import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../global_components/navbar-admin/navbar-admin.component';
import { AdminReceitasTableComponent } from '../../global_components/admin-receitas-table/admin-receitas-table.component';

@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [NavbarAdminComponent, AdminReceitasTableComponent],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss',
})
export class ReceitasComponent {}
