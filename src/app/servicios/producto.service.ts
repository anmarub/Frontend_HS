import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModeloProducto } from '../modelo/producto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    //asigno una variable con la ruta del servidor
  // para accederlo debo usar la palabra this."mi variable"
  url = 'http://localhost:3000'
  // instancion una variable token tipo string que esperar el valor del token al iniciar el servicio
  token: string = "";
  // instancion HttpClient, me ayuda a llarma los servicios del CRUD
  // instancion los servicios de SeguridadService que me ayuda a obtener el token
  constructor(private http : HttpClient,
              private sevicioSeguridad : SeguridadService) { 
                //obtengo el token al iniciar el servicio
                this.sevicioSeguridad.ObtenerToken()
              }

  //metodo obtener todos los productos
  obtenerRegistros(): Observable<ModeloProducto[]>{
    return this.http.get<ModeloProducto[]>(`${this.url}/productos`);
  }

  //metodo obtener un solo producto
  obtenerRegistrosPorId(id : string): Observable<ModeloProducto>{
    return this.http.get<ModeloProducto>(`${this.url}/productos/${id}`);
  }

  //metodo para crear un producto
  CrearProducto(producto : ModeloProducto): Observable<ModeloProducto>{
    return this.http.post<ModeloProducto>(`${this.url}/productos`, producto,
    {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  //metodo para actualizar un producto
  ActualizarProducto(producto : ModeloProducto): Observable<ModeloProducto>{
    return this.http.put<ModeloProducto>(`${this.url}/productos/${producto.id}`, producto,
    {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  //metodo para eliminar un producto
  EliminarProducto(id : string): Observable<any>{
    return this.http.delete(`${this.url}/productos/${id}`,
    {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

}
