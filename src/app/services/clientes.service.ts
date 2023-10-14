import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Clientes';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  rutaGlobal = 'http://localhost:8080/clientes/';

  constructor(private http: HttpClient) { }

  // Crear Cliente
  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.rutaGlobal + 'nuevo/', cliente)
      .pipe(map((response: any) => response));
  }

  // Listar Clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.rutaGlobal + 'listar/');
  }

  // Actualizar Clientes
  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(
      this.rutaGlobal + 'actualizar/' + cliente.id_cliente,
      cliente
    ).pipe(map((response: any) => response));
  }

  // Borrar Clientes
  eliminarCliente(id_cliente: number): Observable<any> {
    return this.http.delete<any>(`${this.rutaGlobal}borrar/${id_cliente}`);
  }
}
