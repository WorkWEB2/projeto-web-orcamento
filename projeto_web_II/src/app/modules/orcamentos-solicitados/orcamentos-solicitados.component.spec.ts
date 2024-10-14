import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentosSolicitadosComponent } from './orcamentos-solicitados.component';

describe('OrcamentosSolicitadosComponent', () => {
  let component: OrcamentosSolicitadosComponent;
  let fixture: ComponentFixture<OrcamentosSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcamentosSolicitadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
