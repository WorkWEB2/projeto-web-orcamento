import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../shared/models';
@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
    usuarioLogado!: Usuario;

  constructor(private router:Router, private loginService: LoginService) {
    this.loginService.retornarUsuario().subscribe(usuario => {
      this.usuarioLogado = usuario;
      const router = inject(Router);
    });
   }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
  
  let url = state.url;
  console.log('Usuário Logado:', this.usuarioLogado); // Verifique se o usuário está logado

  if (this.usuarioLogado) {
      if (route.data?.['role'] && route.data?.['role'].indexOf(this.usuarioLogado.role) === -1) {
          // Se o perfil do usuário não está no perfil da rota
          console.log('Perfil do usuário não autorizado:', this.usuarioLogado);
          this.router.navigate(['/login'], { queryParams: { error: "Proibido o acesso a " + url } });
          return false;
      }
      // Permite o acesso se o perfil for válido
      return true;
  }

  // Se não está logado, redireciona para login
  console.log('Usuário não logado, redirecionando para login');
  this.router.navigate(['/login'], { queryParams: { 
    error: "Deve fazer o login antes de acessar " + url } });
  return false;
  
};

}