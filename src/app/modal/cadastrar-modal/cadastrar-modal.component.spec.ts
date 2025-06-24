import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarModalComponent } from './cadastrar-modal.component';

describe('CadastrarModalComponent', () => {
  let component: CadastrarModalComponent;
  let fixture: ComponentFixture<CadastrarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarModalComponent]
    });
    fixture = TestBed.createComponent(CadastrarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
