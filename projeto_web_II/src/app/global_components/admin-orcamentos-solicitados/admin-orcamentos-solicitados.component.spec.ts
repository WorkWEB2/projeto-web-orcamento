// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AdminOrcamentosSolicitadosComponent } from './admin-orcamentos-solicitados.component';

// describe('AdminOrcamentosSolicitadosComponent', () => {
//   let component: AdminOrcamentosSolicitadosComponent;
//   let fixture: ComponentFixture<AdminOrcamentosSolicitadosComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AdminOrcamentosSolicitadosComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AdminOrcamentosSolicitadosComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orcamentos-solicitados',
  templateUrl: './admin-orcamentos-solicitados.component.html',
  styleUrls: ['./admin-orcamentos-solicitados.component.scss'],
})
export class AdminOrcamentosSolicitadosComponent implements OnInit {
  clientName: string;
  descricaoEquipamento: string;
  categorias: string[] = [];
  categoriaEquipamento: string;
  descricaoDefeito: string;
  responsaveis: string[] = [];
  responsavelSelecionado: string;
  valorOrcamento: number;
  order: any;

  constructor() {}

  ngOnInit(): void {
    // Inicialização dos dados (você pode substituir pelos dados reais)
    this.clientName = 'João Silva';
    this.descricaoEquipamento = 'Notebook Dell Inspiron';
    this.categorias = ['Informática', 'Eletrônicos', 'Eletrodomésticos'];
    this.categoriaEquipamento = '';
    this.descricaoDefeito = 'Não liga';
    this.responsaveis = ['Técnico A', 'Técnico B', 'Técnico C'];
    this.responsavelSelecionado = '';
    this.valorOrcamento = 0;
    this.order = {
      state: 'ABERTA', // Pode ser 'ABERTA', 'APROVADA', 'REDIRECIONADA', 'PAGA'
      history: [
        { status: 'ABERTA', date: new Date('2023-10-01T10:00:00') },
        { status: 'APROVADA', date: new Date('2023-10-02T12:30:00') },
        // Adicione outros logs de histórico conforme necessário
      ],
    };
  }

  salvarOrcamento() {
    // Lógica para salvar o orçamento
    console.log('Orçamento salvo:', this.valorOrcamento);
  }

  getStatusClass(status: string): string {
    // Retorna uma classe CSS baseada no status
    switch (status) {
      case 'ABERTA':
        return 'status-aberta';
      case 'APROVADA':
        return 'status-aprovada';
      case 'REDIRECIONADA':
        return 'status-redirecionada';
      case 'PAGA':
        return 'status-paga';
      default:
        return '';
    }
  }

  efetuarOrcamento() {
    // Lógica para efetuar orçamento
    console.log('Efetuando orçamento...');
  }

  efetuarManutencao() {
    // Lógica para efetuar manutenção
    console.log('Efetuando manutenção...');
  }

  finalizarSolicitacao() {
    // Lógica para finalizar solicitação
    console.log('Finalizando solicitação...');
  }
}
