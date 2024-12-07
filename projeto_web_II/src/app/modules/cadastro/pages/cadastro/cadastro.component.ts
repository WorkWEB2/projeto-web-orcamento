import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { CpfPipe } from '../../../../shared/pipes/cpf-mask.pipe';
import { TelefonePipe } from '../../../../shared/pipes/telefone-mask.pipe';
import { CepPipe } from '../../../../shared/pipes/cep-mask.pipe';
import { Router, RouterLink } from '@angular/router';
import { NumericoDirective } from '../../../../shared/directives/numerico.directive';
import { Usuario } from '../../../../shared/models/usuario.model';
import { LoginService } from '../../../../services/login.service';
import { ClienteService } from '../../../../services/cliente.service';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgxMaskDirective, CpfPipe, 
    TelefonePipe, CepPipe, RouterLink, NumericoDirective
  ],
  providers: [provideNgxMask({ /* opções de cfg */ })],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public cadastroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
    private loginService: LoginService, private router: Router, private clienteService: ClienteService ) { }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      endereco: [''],
      localidade: [''],
      estado: [''],
      celular: ['', Validators.required],
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

  cadastrar() {
    if (this.cadastroForm.valid) {
      const formValues = this.cadastroForm.value;
      const novoUsuario = new Usuario(
        formValues.nome,
        formValues.email,
        formValues.cpf,
        formValues.cep,
        formValues.endereco,
        formValues.localidade,
        formValues.estado,
        formValues.numero,
        formValues.celular,
        "CLIENTE",  // Perfil padrão
      );
  
      this.clienteService.cadastrar(novoUsuario).subscribe( response => { console.log(response); });
      console.log('Usuário registrado:', novoUsuario);  // Verificar no console
      this.router.navigate(['/login']);
    } else if(this.cadastroForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  }
  

}
