import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersTableComponent } from './admin-orders-table.component';

describe('AdminOrdersTableComponent', () => {
  let component: AdminOrdersTableComponent;
  let fixture: ComponentFixture<AdminOrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrdersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
