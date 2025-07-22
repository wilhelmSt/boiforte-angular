import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCompraComponent } from './cadastro-compra.component';

describe('CadastroCompraComponent', () => {
  let component: CadastroCompraComponent;
  let fixture: ComponentFixture<CadastroCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroCompraComponent]
    });
    fixture = TestBed.createComponent(CadastroCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
