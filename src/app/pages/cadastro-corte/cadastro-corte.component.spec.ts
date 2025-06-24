import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCorteComponent } from './cadastro-corte.component';

describe('CadastroCorteComponent', () => {
  let component: CadastroCorteComponent;
  let fixture: ComponentFixture<CadastroCorteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroCorteComponent]
    });
    fixture = TestBed.createComponent(CadastroCorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
