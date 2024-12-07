import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importações necessárias para o ngx-mask
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

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
    dataNascimento: '',
    email: '',
    senha: '',
  };

  constructor() {}

  ngOnInit(): void {
   
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
        dataNascimento: '',
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
        const index = this.funcionarios.findIndex(
          (f) => f.id === this.selectedFuncionario.id
        );
        if (index > -1) {
          this.funcionarios[index] = { ...this.selectedFuncionario };
        }
      } else {
        // Adiciona novo funcionário com ID único
        const newId = this.funcionarios.length
          ? Math.max(...this.funcionarios.map((f) => f.id)) + 1
          : 1;
        this.funcionarios.push({ ...this.selectedFuncionario, id: newId });
      }
    }
    this.closeModal();
  }

  deleteFuncionario(funcionario: any): void {
    this.funcionarios = this.funcionarios.filter(
      (f) => f.id !== funcionario.id
    );
  }
}
