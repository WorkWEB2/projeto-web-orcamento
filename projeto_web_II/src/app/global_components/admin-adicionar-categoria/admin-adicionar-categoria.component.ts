import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-adicionar-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-adicionar-categoria.component.html',
  styleUrls: ['./admin-adicionar-categoria.component.scss'],
})
export class AdminAdicionarCategoriaComponent implements OnInit {
  categorias: Array<{ nome: string }> = [];
  novaCategoria: string = '';
  categoriaEmEdicao: { nome: string } | null = null;

  constructor() {}

  ngOnInit(): void {
    // Dados mockados simulando consumo do backend
    this.categorias = [
      { nome: 'Categoria A' },
      { nome: 'Categoria B' },
      { nome: 'Categoria C' },
    ];
  }

  addCategoria(): void {
    if (this.novaCategoria.trim()) {
      if (this.categoriaEmEdicao) {
        // Atualizar categoria em edição
        this.categoriaEmEdicao.nome = this.novaCategoria;
        this.categoriaEmEdicao = null; // Limpar a edição
      } else {
        // Adicionar nova categoria
        this.categorias.push({ nome: this.novaCategoria });
      }
      this.novaCategoria = '';
    }
  }

  deleteCategoria(categoria: { nome: string }): void {
    this.categorias = this.categorias.filter((c) => c !== categoria);
  }

  editCategoria(categoria: { nome: string }): void {
    this.categoriaEmEdicao = categoria;
    this.novaCategoria = categoria.nome; // Definir o valor do campo de entrada para edição
  }

  cancelEdit(): void {
    this.categoriaEmEdicao = null;
    this.novaCategoria = '';
  }
}
