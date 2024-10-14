import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarOrcamentoComponent } from './solicitar-orcamento.component';

describe('SolicitarOrcamentoComponent', () => {
  let component: SolicitarOrcamentoComponent;
  let fixture: ComponentFixture<SolicitarOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarOrcamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
