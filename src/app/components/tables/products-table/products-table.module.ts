import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsTableComponent } from './products-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ProductsTableComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule],
  exports: [ProductsTableComponent],
})
export class ProductsTableModule {}
