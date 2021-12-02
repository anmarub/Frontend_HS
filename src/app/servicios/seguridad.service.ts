import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelo/identificar.modelo';
// mi servicio es de tipo injectable que significa que puedo
// llamarlo desde cualquier parte de mi aplicacion solo instanciando en el constructor del componente
@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  //asigno una variable con la ruta del servidor
  // para accederlo debo usar la palabra this."mi variable"
  url = 'http://localhost:3000'
  constructor(private http: HttpClient ) { }

  // 1) antes de crear el metodo debo crear mis modelos para llamarlos a esta funcion
  // 2) el modelo debe tener los mismo nombres registrados en el Backend
  // 3) se crean en la carpeta modelo identificar y datos, luego importo el modelo al servicio seguridad.service.ts
  IdentificarUsuario(usuario: string, clave: string): Observable<ModeloIdentificar> {
    // este metodo me va a ejecutar de un metodo post
    // como respuesta me devolvera una promesa o Obervable como se llama TypeScript en este caso un ModeloIdentificar
    return this.http.post<ModeloIdentificar>(`${this.url}/identificarPersona`, 
    {
      usuario: usuario, // igual a la definida en el modelo
      clave: clave, // igual a la definida en el modelo
    },
    {
      headers: new HttpHeaders({}) // variable opcional para enviar cabeceras o Headers
    });
  }
  

}
