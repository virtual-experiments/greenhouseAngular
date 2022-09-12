import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupfactorComponent } from './groupfactor.component';

describe('GroupfactorComponent', () => {
  let component: GroupfactorComponent;
  let fixture: ComponentFixture<GroupfactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupfactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupfactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
