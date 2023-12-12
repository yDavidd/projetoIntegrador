import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormFornecedorComponent } from './fornecedor/form-fornecedor/form-fornecedor.component';
import { FormClientesComponent } from './clientes/form-clientes/form-clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFuncionarioComponent } from './funcionario/form-funcionario/form-funcionario.component';
import { FormEmpresaComponent } from './empresa/form-empresa/form-empresa.component';
import { FormDepartamentoComponent } from './departamento/form-departamento/form-departamento.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormprojetoComponent } from './projeto/form-projeto/form-projeto.component';


@NgModule({
  declarations: [
    AppComponent,
    FormFornecedorComponent,
    FormClientesComponent,
    FormFuncionarioComponent,
    FormEmpresaComponent,
    FormDepartamentoComponent,
    FormprojetoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
