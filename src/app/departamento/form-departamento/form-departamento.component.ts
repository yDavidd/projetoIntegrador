import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartamentoService } from '../service/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Idepartamento } from '../service/idepartamento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-departamento',
  templateUrl: './form-departamento.component.html',
  styleUrls: ['./form-departamento.component.scss']
})
export class FormDepartamentoComponent implements OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    localidade: new FormControl(''),
    descricaoAtividades: new FormControl(''),
    email: new FormControl(''),
})

constructor(
private service:DepartamentoService,
private route:ActivatedRoute,
private router: Router
){ }

ngOnInit(){ this.ListarPorId(); }

Salvar() {
  if(this.form.value.id){
    this.service.atualizar(this.form.value).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Departamento atualizado com sucesso",
          showConfirmButton: false,
          timer: 2000
});
        this.router.navigate(['departamentos']);
      },
      Error => Swal.fire({
        title: "ERRO!",
        text: "Confira as informações",
        imageUrl: "https://imgb.ifunny.co/images/258240e107633fbbbb5e787b1d66ff9c88c3e7770543f6de412650e98fa7bb89_1.webp",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: ""
      })
    );
  }

  else{ 
    this.service.criar(this.form.value).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Departamento cadastrado com sucesso",
          showConfirmButton: false,
          timer: 2000
});
        this.router.navigate(['departamentos']);
      },
      Error => Swal.fire({
        title: "ERRO!",
        text: "Confira as informações",
        imageUrl: "https://imgb.ifunny.co/images/258240e107633fbbbb5e787b1d66ff9c88c3e7770543f6de412650e98fa7bb89_1.webp",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: ""
      })
    );
  }

  this.form.reset();

}

ListarPorId(){
  // essa função captura os parametros da rota. captura o valor da rota, seja ele nulo 
  // ou não e adiciona o parametro capturado no formulário através da função atualizarForm
  // o Pipe garante que será feita uma requisição no servidor e essa requisição será finalizada.
  // O subscribe inscreve / executa a função.
  this.route.params
  .pipe(
    map((params: any) => params['id']),
    switchMap(id => this.service.listarPorId(id))

  ).subscribe(departamentos => this.atualizarForm(departamentos));
}

atualizarForm(departamentos: Idepartamento){
  // o comando abaixo refere-se esse vormulário recebera o 
  // valor do caminho = valor da URL
  this.form.patchValue({
    id: departamentos.id,
    nome:departamentos.nome,
    localidade:departamentos.localidade,
    descricaoAtividades:departamentos.descricaoAtividades,
    email:departamentos.email,

  });

}

Cancelar() {
this.router.navigate(['departamentos']);
console.log('Cancelado');
}

}
