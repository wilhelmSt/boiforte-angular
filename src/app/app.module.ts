import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RelatorioModalModule } from './modal/relatorio-modal/relatorio-modal.module';
import { LayoutModule } from './shared/layout/layout.module';
import { CadastrarModalModule } from './modal/cadastrar-modal/cadastrar-modal.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RelatorioModalModule,
    CadastrarModalModule,
    LayoutModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
