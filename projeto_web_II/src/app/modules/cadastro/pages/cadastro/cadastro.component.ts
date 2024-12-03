import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NumericoDirective } from '../../../../shared/directives/numerico.directive';
import { Usuario } from '../../../../shared/models/usuario.model';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
    RouterLink,
    NumericoDirective,
  ],
  providers: [provideNgxMask({ dropSpecialCharacters: true })],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  public cadastroForm!: FormGroup;
  public senhaGerada: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group(
      {
        nome: ['', [Validators.required]],
        cpf: ['', [Validators.required, cpfValidator()]],
        email: ['', [Validators.required, Validators.email]],
        emailConfirmed: ['', [Validators.required, Validators.email]],
        cep: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        endereco: [''],
        localidade: [''],
        estado: [''],
        telefone: ['', [Validators.required, phoneValidator()]],
      },
      { validators: [emailMatchValidator] }
    );
  }

  onCepChange() {
    const cep = this.cadastroForm.get('cep')?.value;
    if (cep) {
      // Utilize fetch ou HttpClient se quiser manter a funcionalidade de busca de CEP
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (data.erro) {
            this.cadastroForm.get('endereco')?.setValue('');
            this.cadastroForm.get('localidade')?.setValue('');
            this.cadastroForm.get('estado')?.setValue('');
            alert('CEP não encontrado.');
          } else {
            this.cadastroForm.patchValue({
              endereco: data.logradouro,
              localidade: data.localidade,
              estado: data.uf,
            });
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar CEP:', error);
        });
    }
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      const formValues = this.cadastroForm.value;

      // Gerar senha aleatória de 4 dígitos
      const senhaAleatoria = Math.floor(1000 + Math.random() * 9000).toString();
      this.senhaGerada = senhaAleatoria;

      // Gerar SALT
      const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();

      // Hash da senha com SHA-256 e SALT
      const senhaHash = CryptoJS.SHA256(senhaAleatoria + salt).toString();

      const novoUsuario = new Usuario(
        formValues.nome,
        formValues.cpf,
        formValues.email,
        formValues.cep,
        formValues.numero,
        formValues.endereco,
        formValues.localidade,
        formValues.estado,
        formValues.telefone,
        'CLIENTE', // Perfil padrão
        senhaHash,
        salt
      );

      // Recuperar usuários existentes do localStorage
      let usuarios: Usuario[] = [];
      const usuariosJSON = localStorage.getItem('usuarios');
      if (usuariosJSON) {
        usuarios = JSON.parse(usuariosJSON);
      }

      // Verificar se o e-mail já está cadastrado
      const emailExistente = usuarios.find(
        (u: Usuario) => u.email === novoUsuario.email
      );
      if (emailExistente) {
        alert('Este e-mail já está cadastrado.');
        return;
      }

      // Adicionar o novo usuário à lista
      usuarios.push(novoUsuario);

      // Armazenar a lista atualizada no localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      // Simular registro de usuário
      console.log('Usuário registrado:', novoUsuario);

      // Simular envio de e-mail
      console.log(
        `Enviando e-mail para ${formValues.email} com a senha: ${senhaAleatoria}`
      );

      // Navegar para a página de login
      this.router.navigate(['/login']);
      alert('Usuário cadastrado com sucesso! Verifique seu e-mail.');

      // this.loginService.registrarUsuario(novoUsuario).subscribe(response => {
      //   // Enviar e-mail com a senha
      //   const subject = 'Sua senha de acesso';
      //   const message = `Olá ${formValues.nome},\n\nSua senha de acesso é: ${senhaAleatoria}\n\nAtenciosamente,\nEquipe`;
      //   this.apiService.sendEmail(formValues.email, subject, message).subscribe(() => {
      //     console.log('Usuário registrado e e-mail enviado:', novoUsuario);
      //     this.router.navigate(['/login']);
      //   }, error => {
      //     console.error('Erro ao enviar e-mail:', error);
      //   });
      // }, error => {
      //   console.error('Erro ao registrar usuário:', error);
      // });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}

// Validador de CPF
function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value.replace(/\D/g, '');
    if (cpf.length !== 11) {
      return { cpfInvalid: true };
    }
    if (/^(\d)\1+$/.test(cpf)) {
      return { cpfInvalid: true };
    }
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10)))
      return { cpfInvalid: true };
    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11)))
      return { cpfInvalid: true };
    return null;
  };
}

// Validador de telefone
function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phone = control.value.replace(/\D/g, '');
    if (phone.length < 10 || phone.length > 11) {
      return { phoneInvalid: true };
    }
    return null;
  };
}

// Validador de confirmação de e-mail
function emailMatchValidator(group: AbstractControl): ValidationErrors | null {
  const email = group.get('email')?.value;
  const emailConfirmed = group.get('emailConfirmed')?.value;
  return email === emailConfirmed ? null : { emailsDoNotMatch: true };
}
