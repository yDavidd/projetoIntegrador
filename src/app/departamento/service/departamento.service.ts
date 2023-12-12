import { Injectable } from '@angular/core';
import { Idepartamento } from './idepartamento';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
   // o readonly serve para dizer que a variável não pode ser alterada
  // A variável API está fazedo a conexão com o backend
  private readonly  API ="http://localhost:8080/departamentos";

  constructor(private http: HttpClient) { }

  listar(){
    // O atributo <Icursos[]> serve para parametrizar o retorno da classe
    return this.http.get<Idepartamento[]>(this.API);
  }


  listarPorId(id:object) {
    return this.http.get<Idepartamento>(`${this.API}/${id}`).pipe(take(1));
  }

  criar(departamentos:object) {
    // o pipe take 1 serve para ir apenas umas vez no servidor e voltar.
    return this.http.post(this.API, departamentos).pipe(take(1));
  }

  atualizar(departamentos:any){
    return this.http.put(`${this.API}/${departamentos.id}`, departamentos).pipe(take(1));
  }

  excluir(id:any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
  
}