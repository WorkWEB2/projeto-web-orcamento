import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdicionarFuncionarioComponent } from './admin-adicionar-funcionario.component';

describe('AdminAdicionarFuncionarioComponent', () => {
  let component: AdminAdicionarFuncionarioComponent;
  let fixture: ComponentFixture<AdminAdicionarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAdicionarFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdicionarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
