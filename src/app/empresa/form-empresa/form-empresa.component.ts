import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmpresaService } from '../service/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import {Iempresa} from '../service/iempresa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.scss']
})

export class FormEmpresaComponent implements  OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cnpj: new FormControl (''),
    endereco: new FormControl(''),
    socios: new FormControl (''),
    faturamento: new FormControl(''),
});

constructor(
private service: EmpresaService,
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
          title: "Empresa atualizada com sucesso",
          showConfirmButton: false,
          timer: 2000
});
        this.router.navigate(['empresa']);
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
          title: "Empresa cadastrada com sucesso",
          showConfirmButton: false,
          timer: 2000
});
        this.router.navigate(['empresa']);
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

  ).subscribe(empresa => this.atualizarForm(empresa));
}

atualizarForm(empresa: Iempresa){
  // o comando abaixo refere-se esse vormulário recebera o 
  // valor do caminho = valor da URL
  this.form.patchValue({
    id: empresa.id,
    nome:empresa.nome,
    cnpj:empresa.cnpj,
    endereco:empresa.endereco,
    socios:empresa.socios,
    faturamento:empresa.faturamento
  });

}

Cancelar() {
this.router.navigate(['empresa']);
console.log('Cancelado');
}

}
