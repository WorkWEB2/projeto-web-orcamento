import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../app/services/login.service';
import { Usuario } from '../app/shared/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  template: `<router-outlet />`
})
export class AppComponent {
  title = 'Cadastro de Pessoas';
  constructor(
    private router: Router,
    private loginService: LoginService) { }
 
 
  get usuarioLogado(): Usuario | null {
    return this.loginService.usuarioLogado;
  } 

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  temPermissao(...perfis: string[]) : boolean {
    let usu = this.usuarioLogado;
    if (usu != null && perfis.length>0) {
      for (let p of perfis) {
        if (usu.perfil.indexOf(p)!=-1) {
          return true;
        }
      }
    }
    return false;
    }
}
