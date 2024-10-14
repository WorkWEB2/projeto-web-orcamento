import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrcamentosSolicitadosComponent } from './admin-orcamentos-solicitados.component';

describe('AdminOrcamentosSolicitadosComponent', () => {
  let component: AdminOrcamentosSolicitadosComponent;
  let fixture: ComponentFixture<AdminOrcamentosSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrcamentosSolicitadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrcamentosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
