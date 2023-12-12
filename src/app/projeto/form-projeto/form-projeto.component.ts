import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjetoService } from '../service/projeto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Iprojeto } from '../service/iprojeto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-projeto',
  templateUrl: './form-projeto.component.html',
  styleUrls: ['./form-projeto.component.scss']
})

export class FormprojetoComponent implements  OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    descricao: new FormControl (''),
    qtdeParticipantes: new FormControl(''),
    responsavel: new FormControl (''),
    custo: new FormControl(''),

  
});

constructor(
private service: ProjetoService,
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
          title: "Projeto atualizado com sucesso",
          showConfirmButton: false,
          timer: 2000
});
        this.router.navigate(['projetos']);
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
          title: "Projeto cadastrado com sucesso",
          showConfirmButton: false,
          timer: 2000
});
        this.router.navigate(['projetos']);
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
this.route.params
  .pipe(
    map((params: any) => params['id']),
    switchMap(id => this.service.listarPorId(id))

  ).subscribe(projeto => this.atualizarForm(projeto));
}

atualizarForm(projeto: Iprojeto){
  // o comando abaixo refere-se esse vormulário recebera o 
  // valor do caminho = valor da URL
  this.form.patchValue({
    id: projeto.id,
    nome:projeto.nome,
    descricao:projeto.descricao,
    qtdeParticipantes:projeto.qtdeParticipantes,
    responsavel:projeto.responsavel,
    custo:projeto.custo
  });

}

Cancelar() {
this.router.navigate(['projetos']);
console.log('Cancelado');
}

}
