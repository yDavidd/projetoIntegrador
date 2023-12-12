import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { Ifuncionario } from './ifuncionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  // o readonly serve para dizer que a variável não pode ser alterada
  // A variável API está fazedo a conexão com o backend
  private readonly  API ="http://localhost:8080/funcionarios";

  constructor(private http: HttpClient) { }

  listar(){
    // O atributo <Ifuncionario[]> serve para parametrizar o retorno da classe
    return this.http.get<Ifuncionario[]>(this.API);
  }


  listarPorId(id:object) {
    return this.http.get<Ifuncionario>(`${this.API}/${id}`).pipe(take(1));
  }

  criar(funcionarios:object) {
    // o pipe take 1 serve para ir apenas umas vez no servidor e voltar.
    return this.http.post(this.API, funcionarios).pipe(take(1));
  }

  atualizar(funcionarios:any){
    return this.http.put(`${this.API}/${funcionarios.id}`, funcionarios).pipe(take(1));
  }

  excluir(id:any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
  
}