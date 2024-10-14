import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarOrcamentoTableComponent } from './solicitar-orcamento-table.component';

describe('SolicitarOrcamentoComponent', () => {
  let component: SolicitarOrcamentoTableComponent;
  let fixture: ComponentFixture<SolicitarOrcamentoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarOrcamentoTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitarOrcamentoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
