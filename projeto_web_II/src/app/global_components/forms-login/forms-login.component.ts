import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule,ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Usuario, Login } from '../../shared/models';


@Component({
  selector: 'app-forms-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './forms-login.component.html',
  styleUrls: ['./forms-login.component.scss']
})
export class FormsLoginComponent implements OnInit {
  
  @ViewChild('formLogin') formLogin! : NgForm;
  login: Login = new Login("", "");
  loading: boolean= false;
  message!: string;

  constructor(private formBuilder: FormBuilder, private router:Router,
    private loginService: LoginService, private route: ActivatedRoute
  ) { }

  ngOnInit(): void{
      /*if(this.loginService.usuarioLogado) {
        this.router.navigate( ["/home"] );
      }
      else{
        this.route.queryParams.subscribe(
          params=> {
            this.message= params['error'];
        });
      }*/
    }

    logar(): void {
      if (this.formLogin.form.valid) {
        this.loginService.logar(this.login).subscribe(usu => {
          console.log(usu);
          if (usu != null) {
            this.loginService.usuarioLogado = usu;
            this.loading = false;
            this.loginService.saveToken(usu.message);
            this.loginService.retornarUsuario().subscribe(usuario => {
              if(usuario.role === "FUNCIONARIO") {
                this.router.navigate(['/admin/home']);
              } if (usuario.role === "CLIENTE") {
              this.router.navigate(['/home']);
              }
              return;
            });
          } else {
            this.loading = false;
            this.message = "Usuário/Senha inválidos.";
          }
        });
      } else {   
        this.loading = false;
      }
      /*
      console.log(this.login);  // Isso está funcionando, então o método é chamado
      this.loading = true;
      if (this.formLogin.form.valid) {
          this.loginService.login(this.login).subscribe((usu) => {
              console.log(usu);
              if (usu != null) {
                  // //if(usu.perfil === "ADMIN") {
                  //     this.loginService.usuarioLogado = usu;
                  //     this.loading = false;
                  //     this.router.navigate(['/admin/home']);
                  // }
                  // else {
                  //     this.loginService.usuarioLogado = usu;
                  //     this.loading = false;
                  //     this.router.navigate(['/home']);
                  // }
              } else {
                  this.loading = false;  // Termina o loading, caso não tenha sucesso
                  this.message = "Usuário/Senha inválidos.";  // Mensagem de erro
              }
          });
      } else {
          this.loading = false;
      }*/
  }
  
}
