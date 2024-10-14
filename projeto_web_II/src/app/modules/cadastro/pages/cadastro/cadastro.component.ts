import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { CpfPipe } from '../../../../shared/pipes/cpf-mask.pipe';
import { TelefonePipe } from '../../../../shared/pipes/telefone-mask.pipe';
import { CepPipe } from '../../../../shared/pipes/cep-mask.pipe';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgxMaskDirective, CpfPipe, TelefonePipe, CepPipe],
  providers: [provideNgxMask({ /* opções de cfg */ })],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public cadastroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailConfirmed: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      endereco: [''],
      localidade: [''],
      estado: [''],
      telefone: ['', Validators.required]
    });
  }

  onCepChange() {
    const cep = this.cadastroForm.get('cep')?.value;
    if (cep) {
      this.apiService.getAddress(cep).subscribe(data => {
        this.cadastroForm.patchValue({
          endereco: data.logradouro,
          localidade: data.localidade,
          estado: data.uf
        });
      });
    }
  }
}
