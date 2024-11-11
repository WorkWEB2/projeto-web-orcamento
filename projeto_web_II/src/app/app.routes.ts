import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { CadastroComponent } from './modules/cadastro/pages/cadastro/cadastro.component';
import { HomeComponent } from './modules/home/home.component';
import { HomeAdminComponent } from './modules/home-admin/home-admin.component';
import { SolicitarOrcamentoComponent } from './modules/solicitar-orcamento/solicitar-orcamento.component';
import { MostrarOrcamentosComponent } from './modules/mostrar-orcamentos/mostrar-orcamentos.component';
import { OrcamentosSolicitadosComponent } from './modules/orcamentos-solicitados/orcamentos-solicitados.component';
import { CadastrarFuncionarioComponent } from './modules/cadastrar-funcionario/cadastrar-funcionario.component';
import { CadastrarCategoriaComponent } from './modules/cadastrar-categoria/cadastrar-categoria.component';
import { ReceitasComponent } from './modules/receitas/receitas.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    },
    
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  // Rota referente a página de usuário
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'solicitar-orcamento',
    component: SolicitarOrcamentoComponent,
  },
  {
    path: 'mostrar-orcamentos',
    component: MostrarOrcamentosComponent,
  },
  // Rota referente a página de admin
  {
    path: 'admin/home',
    component: HomeAdminComponent,
  },
  {
    path: 'admin/orcamentos-solicitados',
    component: OrcamentosSolicitadosComponent,
  },
  {
    path: 'admin/orcamentos-solicitados/:id',
    component: OrcamentosSolicitadosComponent,
  },
  {
    path: 'admin/cadastrar-funcionario',
    component: CadastrarFuncionarioComponent,
  },
  {
    path: 'admin/cadastrar-categoria',
    component: CadastrarCategoriaComponent,
  },
  {
    path: 'admin/receitas',
    component: ReceitasComponent,
  },
];
