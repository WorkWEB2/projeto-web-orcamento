import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../shared/models/categoria.models';

@Component({
  selector: 'app-admin-adicionar-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-adicionar-categoria.component.html',
  styleUrls: ['./admin-adicionar-categoria.component.scss'],
})
export class AdminAdicionarCategoriaComponent implements OnInit {
  categorias: Array<Categoria> = [];
  novaCategoria: string = '';
  categoriaEmEdicao: Categoria | null = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.listar().subscribe(
        (categorias) => {
          this.categorias = categorias;
        },
        (error) => {
          console.error('Erro ao listar categorias:', error);
        }
      );
  }

  addCategoria(): void {
    if (this.novaCategoria.trim()) {
      this.categoriaService.cadastrar({ nome: this.novaCategoria }).subscribe(
        (categoria) => {
          console.log('Categoria cadastrada com sucesso:', categoria);
          this.categorias.push(categoria);
          this.novaCategoria = '';
        },
        (error) => {
          console.error('Erro ao cadastrar categoria:', error);
        }
      );
    }
  }

  deleteCategoria(id:number): void {
    this.categoriaService.deletar(id).subscribe(
      () => {
        console.log('Categoria deletada com sucesso:', id);
        this.categorias = this.categorias.filter((c) => c.id !== id);
      },
      (error) => {
        console.error('Erro ao deletar categoria:', error);
      }
    )
    
  }

  salvarEdicao(): void {
    if (this.categoriaEmEdicao) {
      const categoriaAtualizada: Categoria = {
        ...this.categoriaEmEdicao,
        nome: this.novaCategoria.trim()
      };
  
      this.categoriaService.atualizar(categoriaAtualizada).subscribe(
        (categoriaAtualizada) => {
          console.log('Categoria atualizada com sucesso:', categoriaAtualizada);
  
          // Atualiza a lista de categorias com o valor atualizado
          const index = this.categorias.findIndex((c) => c.id === categoriaAtualizada.id);
          if (index !== -1) {
            this.categorias[index] = categoriaAtualizada;
          }
  
          // Reseta os campos de edição
          this.cancelEdit();
        },
        (error) => {
          console.error('Erro ao atualizar categoria:', error);
        }
      );
    }
  }
  

  cancelEdit(): void {
    this.categoriaEmEdicao = null;
    this.novaCategoria = '';
  }

  iniciarEdicao(categoria: Categoria): void {
    this.categoriaEmEdicao = { ...categoria }; 
    this.novaCategoria = categoria.nome;
  }
  
}
