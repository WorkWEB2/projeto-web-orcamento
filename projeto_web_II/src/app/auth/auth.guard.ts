import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const usuarioLogado = loginService.usuarioLogado;
  let url = state.url;
  console.log('Usuário Logado:', usuarioLogado); // Verifique se o usuário está logado

  if (usuarioLogado) {
      if (route.data?.['role'] && route.data?.['role'].indexOf(usuarioLogado) === -1) {
          // Se o perfil do usuário não está no perfil da rota
          console.log('Perfil do usuário não autorizado:', usuarioLogado);
          router.navigate(['/login'], { queryParams: { error: "Proibido o acesso a " + url } });
          return false;
      }
      // Permite o acesso se o perfil for válido
      return true;
  }

  // Se não está logado, redireciona para login
  console.log('Usuário não logado, redirecionando para login');
  router.navigate(['/login'], { queryParams: { 
    error: "Deve fazer o login antes de acessar " + url } });
  return false;
};

