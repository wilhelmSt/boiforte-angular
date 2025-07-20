import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { ProductsTableModule } from 'src/app/components/products-table/products-table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { CardInfoModule } from 'src/app/components/card-info/card-info.module';

@NgModule({
  declarations: [ProdutosComponent],
  imports: [CommonModule, MatIconModule, ProdutosRoutingModule, MatDialogModule, ProductsTableModule, CardInfoModule],
})
export class ProdutosModule {}
