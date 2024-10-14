import { Component } from '@angular/core';
import { NavbarUserComponent } from '../../global_components/navbar-user/navbar-user.component';
import { SolicitarOrcamentoTableComponent } from '../../global_components/solicitar-orcamento-table/solicitar-orcamento-table.component';

@Component({
  selector: 'app-solicitar-orcamento',
  standalone: true,
  imports: [NavbarUserComponent, SolicitarOrcamentoTableComponent],
  templateUrl: './solicitar-orcamento.component.html',
  styleUrl: './solicitar-orcamento.component.scss',
})
export class SolicitarOrcamentoComponent {}
