import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReceitasTableComponent } from './admin-receitas-table.component';

describe('AdminReceitasTableComponent', () => {
  let component: AdminReceitasTableComponent;
  let fixture: ComponentFixture<AdminReceitasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReceitasTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReceitasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
