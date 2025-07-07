import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsTableComponent } from './products-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsTableComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule, FormsModule],
  exports: [ProductsTableComponent],
})
export class ProductsTableModule {}
