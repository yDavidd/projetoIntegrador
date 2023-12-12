import { Component, OnInit } from '@angular/core';
import{ Idepartamento } from '../service/idepartamento'
import { DepartamentoService } from '../service/departamento.service';
import { ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listardepartamento',
  templateUrl: './listardepartamento.component.html',
  styleUrls: ['./listardepartamento.component.scss']
})
export class ListardepartamentoComponent {
  departamento: Idepartamento[]=[];
  
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
})

  constructor(
    private service: DepartamentoService, 
    private router: Router, 
    private route: ActivatedRoute){ }

  ngOnInit(): void {
     this.Listar();
  }

  Listar(){
     // a minha variavel do tipo cursos está recebendo o json da API
     this.service.listar().subscribe(dados => this.departamento = dados);
  }

  Editar(id:number){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  Excluir(id:number){
    this.service.excluir(id).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Departamento excluído com sucesso",
          showConfirmButton: false,
          timer: 2000
});
        this.service.listar().subscribe(dados => this.departamento = dados);
      },
      Error => alert("Erro ao excluir o departamento ")
    );
  }
}