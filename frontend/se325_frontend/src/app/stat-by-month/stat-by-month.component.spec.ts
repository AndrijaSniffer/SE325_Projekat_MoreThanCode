import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatByMonthComponent} from './stat-by-month.component';

describe('StatByMonthComponent', () => {
  let component: StatByMonthComponent;
  let fixture: ComponentFixture<StatByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatByMonthComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StatByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
