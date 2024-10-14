import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../global_components/navbar-admin/navbar-admin.component';
import { AdminAdicionarCategoriaComponent } from '../../global_components/admin-adicionar-categoria/admin-adicionar-categoria.component';

@Component({
  selector: 'app-cadastrar-categoria',
  standalone: true,
  imports: [NavbarAdminComponent, AdminAdicionarCategoriaComponent],
  templateUrl: './cadastrar-categoria.component.html',
  styleUrl: './cadastrar-categoria.component.scss',
})
export class CadastrarCategoriaComponent {}
