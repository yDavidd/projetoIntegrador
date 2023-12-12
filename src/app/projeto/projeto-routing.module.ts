import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarprojetoComponent } from './listarprojeto/listarprojeto.component';
import { FormprojetoComponent } from '../projeto/form-projeto/form-projeto.component';


const routes: Routes = [
  {path:"",component:ListarprojetoComponent},
  {path: "novo", component:FormprojetoComponent},
  {path:"editar/:id", component:FormprojetoComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule { }