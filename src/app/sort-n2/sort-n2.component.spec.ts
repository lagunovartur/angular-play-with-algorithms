import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortN2Component } from './sort-n2.component';

describe('BubbleSortComponent', () => {
  let component: SortN2Component;
  let fixture: ComponentFixture<SortN2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortN2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortN2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
