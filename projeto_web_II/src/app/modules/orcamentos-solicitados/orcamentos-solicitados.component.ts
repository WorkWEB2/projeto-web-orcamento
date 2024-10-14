import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../global_components/navbar-admin/navbar-admin.component';
import { AdminOrcamentosSolicitadosComponent } from '../../global_components/admin-orcamentos-solicitados/admin-orcamentos-solicitados.component';

@Component({
  selector: 'app-orcamentos-solicitados',
  standalone: true,
  imports: [NavbarAdminComponent, AdminOrcamentosSolicitadosComponent],
  templateUrl: './orcamentos-solicitados.component.html',
  styleUrl: './orcamentos-solicitados.component.scss',
})
export class OrcamentosSolicitadosComponent {}
