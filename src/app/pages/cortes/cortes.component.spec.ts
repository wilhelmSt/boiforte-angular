import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CortesComponent } from './cortes.component';

describe('CortesComponent', () => {
  let component: CortesComponent;
  let fixture: ComponentFixture<CortesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CortesComponent]
    });
    fixture = TestBed.createComponent(CortesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
