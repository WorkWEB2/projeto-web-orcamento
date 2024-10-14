import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-adicionar-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-adicionar-funcionario.component.html',
  styleUrls: ['./admin-adicionar-funcionario.component.scss'],
})
export class AdicionarFuncionarioComponent implements OnInit {
  funcionarios: Array<any> = [];
  isModalOpen: boolean = false;
  selectedFuncionario: any = {
    nome: '',
    dataNascimento: '',
    email: '',
    senha: '',
  };

  constructor() {}

  ngOnInit(): void {
    // Dados mockados simulando consumo do backend
    this.funcionarios = [
      {
        nome: 'João Silva',
        dataNascimento: '1990-01-01',
        email: 'joao@email.com',
        senha: '123456',
      },
      {
        nome: 'Maria Oliveira',
        dataNascimento: '1995-01-01',
        email: 'maria@email.como',
        senha: '123456',
      },
      {
        nome: 'Pedro Souza',
        dataNascimento: '1980-01-01',
        email: 'pedro@email.com',
        senha: '123456',
      },
    ];
  }

  openModal(funcionario?: any): void {
    this.isModalOpen = true;
    if (funcionario) {
      this.selectedFuncionario = { ...funcionario };
    } else {
      this.selectedFuncionario = {
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
      const index = this.funcionarios.findIndex(
        (f) => f.nome === this.selectedFuncionario.nome
      );
      if (index > -1) {
        this.funcionarios[index] = { ...this.selectedFuncionario };
      } else {
        this.funcionarios.push({ ...this.selectedFuncionario });
      }
    }
    this.closeModal();
  }

  deleteFuncionario(funcionario: any): void {
    this.funcionarios = this.funcionarios.filter((f) => f !== funcionario);
  }
}
