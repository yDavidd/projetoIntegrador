import { Component, OnInit } from '@angular/core';
import{ Iempresa} from '../service/iempresa'
import { EmpresaService } from '../service/empresa.service';
import { ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listarempresa',
  templateUrl: './listarempresa.component.html',
  styleUrls: ['./listarempresa.component.scss']
})
export class ListarEmpresaComponent implements OnInit{
  empresas: Iempresa[]=[];
  
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cnpj: new FormControl (''),
    endereco: new FormControl(''),
    socios: new FormControl (''),
    faturamento: new FormControl(''),

})


  constructor(
    private service: EmpresaService, 
    private router: Router, 
    private route: ActivatedRoute){ }

  ngOnInit(): void {
     this.Listar();
  }

  Listar(){
     // a minha variavel do tipo cursos está recebendo o json da API
     this.service.listar().subscribe(dados => this.empresas = dados);
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
          title: "Empresa excluída com sucesso",
          showConfirmButton: false,
          timer: 2000
});
        this.service.listar().subscribe(dados => this.empresas = dados);
      },
      Error => alert("Erro ao excluir o curso ")
    );
  }
}