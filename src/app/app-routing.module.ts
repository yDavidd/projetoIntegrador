import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { ClientesModule } from './clientes/clientes.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { HomeModule } from './home/home.module';
import { EmpresaModule } from './empresa/empresa.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { ProjetoModule } from './projeto/projeto.module';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'fornecedores', loadChildren:()=> FornecedorModule},
  {path: 'clientes', loadChildren:()=> ClientesModule},
  {path: 'funcionarios', loadChildren:()=> FuncionarioModule},
  {path: 'home', loadChildren:() => HomeModule},
  {path: 'empresa', loadChildren:()=> EmpresaModule},
  {path: 'departamentos', loadChildren:()=>DepartamentoModule},
  {path: 'projetos', loadChildren:()=>ProjetoModule}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
