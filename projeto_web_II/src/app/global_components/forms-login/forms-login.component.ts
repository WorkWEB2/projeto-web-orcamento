import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forms-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './forms-login.component.html',
  styleUrls: ['./forms-login.component.scss']
})
export class FormsLoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      if (email.endsWith('@admin.com')) { 
        this.router.navigate(['/admin/home']); 
      } else { 
        this.router.navigate(['/home']);
      }
    } else {
      // Verifica se o e-mail ou a senha estão vazios
      if (this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched) {
        alert('Por favor, preencha o e-mail.');
      }
      if (this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched) {
        alert('Por favor, preencha a senha.');
      }
      
      // Marcar todos os campos como tocados para exibir mensagens de erro
      this.loginForm.markAllAsTouched();
    }
  }
}
