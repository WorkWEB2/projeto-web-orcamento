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
      this.categorias.push({ nome: this.novaCategoria });
      this.novaCategoria = '';
    }
  }

  deleteCategoria(categoria: { nome: string }): void {
    this.categorias = this.categorias.filter((c) => c !== categoria);
  }
}
