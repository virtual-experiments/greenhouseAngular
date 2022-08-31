import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthbarComponent } from './growthbar.component';

describe('GrowthbarComponent', () => {
  let component: GrowthbarComponent;
  let fixture: ComponentFixture<GrowthbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowthbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
