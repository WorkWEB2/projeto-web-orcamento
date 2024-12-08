import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importações necessárias para o ngx-mask
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-admin-adicionar-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './admin-adicionar-funcionario.component.html',
  styleUrls: ['./admin-adicionar-funcionario.component.scss'],
  providers: [provideNgxMask()], // Providencia o ngx-mask para o componente
})
export class AdicionarFuncionarioComponent implements OnInit {
  funcionarios: Array<any> = [];
  isModalOpen: boolean = false;
  selectedFuncionario: any = {
    id: null,
    nome: '',
    dtNascimento: '',
    email: '',
    senha: '',
  };

  constructor(private funcionarioService:FuncionarioService) {}

  ngOnInit(): void {
    this.funcionarioService.listar().subscribe(
      (funcionarios) => {
        this.funcionarios = funcionarios;
      },
      (error) => {
        console.error('Erro ao listar funcionários:', error);
      }
    );
  }

  openModal(funcionario?: any): void {
    this.isModalOpen = true;
    if (funcionario) {
      // Clona o objeto para evitar mutações indesejadas
      this.selectedFuncionario = { ...funcionario };
    } else {
      this.selectedFuncionario = {
        id: null,
        nome: '',
        dtNascimento: '',
        email: '',
        senha: '',
      };
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveFuncionario(): void {
    if (this.selectedFuncionario.nome) {
      if (this.selectedFuncionario.id) {
        // Atualiza o funcionário existente
        this.funcionarioService.atualizar(this.selectedFuncionario).subscribe(
          (funcionario) => {
            console.log('Funcionário atualizado:', funcionario);
          },
          (error) => {
            console.error('Erro ao atualizar funcionário:', error);
          }
        );
      } else {
        // Adiciona novo funcionário com ID único
        this.funcionarioService.cadastrar(this.selectedFuncionario).subscribe(
          (funcionario) => {
            console.log('Funcionário cadastrado:', funcionario);
          },
          (error) => {
            console.error('Erro ao cadastrar funcionário:', error);
          }
        );
      }
    }
    this.closeModal();
  }

  deleteFuncionario(funcionario: any): void {
    this.funcionarioService.deletar(funcionario.id).subscribe(
      (response) => {
        console.log('Funcionário deletado:', response);
        this.funcionarios = this.funcionarios.filter(
          (f) => f.id !== funcionario.id
        );
      },
      (error) => {
        console.error('Erro ao deletar funcionário:', error);
        alert('Erro ao deletar funcionário');
      }
    );
  }
}
