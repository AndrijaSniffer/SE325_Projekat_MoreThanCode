import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatByYearComponent} from './stat-by-year.component';

describe('StatByYearComponent', () => {
  let component: StatByYearComponent;
  let fixture: ComponentFixture<StatByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatByYearComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StatByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
