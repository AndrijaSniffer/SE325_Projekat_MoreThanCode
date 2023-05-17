import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatByPropertyComponent} from './stat-by-property.component';

describe('StatByPropertyComponent', () => {
  let component: StatByPropertyComponent;
  let fixture: ComponentFixture<StatByPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatByPropertyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StatByPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
