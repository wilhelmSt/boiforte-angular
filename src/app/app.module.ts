import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { RelatorioModalModule } from './modal/relatorio-modal/relatorio-modal.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, RelatorioModalModule],
  exports: [MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
