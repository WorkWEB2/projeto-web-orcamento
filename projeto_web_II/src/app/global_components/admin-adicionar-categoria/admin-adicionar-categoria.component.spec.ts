import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdicionarCategoriaComponent } from './admin-adicionar-categoria.component';

describe('AdminAdicionarCategoriaComponent', () => {
  let component: AdminAdicionarCategoriaComponent;
  let fixture: ComponentFixture<AdminAdicionarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAdicionarCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdicionarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
