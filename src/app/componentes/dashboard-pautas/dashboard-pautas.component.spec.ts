import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPautasComponent } from './dashboard-pautas.component';

describe('DashboardPautasComponent', () => {
  let component: DashboardPautasComponent;
  let fixture: ComponentFixture<DashboardPautasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPautasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPautasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
