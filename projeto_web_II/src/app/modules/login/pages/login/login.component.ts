import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderLogoComponent } from '../../../../global_components/header-logo/header-logo.component';
import { FormsLoginComponent } from '../../../../global_components/forms-login/forms-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,HeaderLogoComponent,FormsLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
