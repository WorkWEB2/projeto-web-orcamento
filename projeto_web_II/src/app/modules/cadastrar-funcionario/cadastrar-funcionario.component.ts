import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../global_components/navbar-admin/navbar-admin.component';
import { AdicionarFuncionarioComponent } from '../../global_components/admin-adicionar-funcionario/admin-adicionar-funcionario.component';

@Component({
  selector: 'app-cadastrar-funcionario',
  standalone: true,
  imports: [NavbarAdminComponent, AdicionarFuncionarioComponent],
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrl: './cadastrar-funcionario.component.scss',
})
export class CadastrarFuncionarioComponent {}
