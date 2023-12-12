import { Component, OnInit } from '@angular/core';
import { Iprojeto } from '../service/iprojeto';
import { ProjetoService } from '../service/projeto.service';
import { ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listarprojeto',
  templateUrl: './listarprojeto.component.html',
  styleUrls: ['./listarprojeto.component.scss']
})
export class ListarprojetoComponent implements OnInit{
  projetos: Iprojeto[]=[];
  
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    descricao: new FormControl (''),
    qtdeParticpantes: new FormControl(''),
    responsavel: new FormControl (''),
    custo: new FormControl(''),

})


  constructor(
    private service: ProjetoService, 
    private router: Router, 
    private route: ActivatedRoute){ }

  ngOnInit(): void {
     this.Listar();
  }

  Listar(){
     // a minha variavel do tipo cursos está recebendo o json da API
     this.service.listar().subscribe(dados => this.projetos = dados);
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
          title: "Projeto excluído com sucesso",
          showConfirmButton: false,
          timer: 2000
});
        this.service.listar().subscribe(dados => this.projetos = dados);
      },
      Error => alert("Erro ao excluir o projeto ")
    );
  }
}