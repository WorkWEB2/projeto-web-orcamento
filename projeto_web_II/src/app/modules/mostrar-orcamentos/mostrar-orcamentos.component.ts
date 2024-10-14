import { Component } from '@angular/core';
import { NavbarUserComponent } from '../../global_components/navbar-user/navbar-user.component';

@Component({
  selector: 'app-mostrar-orcamentos',
  standalone: true,
  imports: [NavbarUserComponent],
  templateUrl: './mostrar-orcamentos.component.html',
  styleUrl: './mostrar-orcamentos.component.scss',
})
export class MostrarOrcamentosComponent {}
