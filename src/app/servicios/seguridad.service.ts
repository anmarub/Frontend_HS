import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  //Creo un BehiviorSubject para poder revisar el comportamiento de la variable
  //este contiene el ModeloIdetificar y lo instancia en Vacio
  datosUsuariosEnSession = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());


  constructor(private http: HttpClient ) {
    //Invoco el metodo local para cuando se ejecute la primera vex llame el metodo VerificarSesionActual
    this.VerificarSesionActual();
   }

  //Creo un metodo para validar la informacion de session activa
  VerificarSesionActual(){
    //obtego los datos de la session que estan en el localStorage con el metodo creado
    let datos = this.ObtenerInfomacionSesion();
    if(datos){
      //llamo la funcion de refrescar para traer los datos actualizados del localstorage
      this.RefrescarDatosSesion(datos);
    }
  }
  //Creo un metodo para refrescar los datos del modeloIdentificar
  RefrescarDatosSesion(datos : ModeloIdentificar){
    //si existe la informacion en el localStorage actualiceme los datos que me llegan
    this.datosUsuariosEnSession.next(datos);
  }

  //Creo un metodo para devolver el valor de inicio de sesion como ub observable
  ObtenerDatosUsuarioEnSession(){
    // devuelvo los datos de usuario como un observable
    return this.datosUsuariosEnSession.asObservable();
  }

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

  //una vez capturada la informacion de session, esta debe ser almacenada en el localStorage
  //Creamos una funcion que almacene la informacion en el localStorage
  AlmacenarSesion(datos : ModeloIdentificar){
    // asigno verdadero al atributo estaIdentificado
    datos.estaIdentificado = true;
    //convertimos el objeto en un string para almacenarlo en el localStorage
    let stringDatos = JSON.stringify(datos);
    //llamo al funcion localStorage.setItem y le paso como el nombre JSON y la variable stringDatos que contiene los datos
    // Se ve asi datosSesion:{ token}
    localStorage.setItem("datosSesion", stringDatos);
    //Una vez termine todo el proceso refresco los datos de la session
    this.RefrescarDatosSesion(datos);
  }

  //creo un metodo para obtener la informacion del localstorage
  ObtenerInfomacionSesion(){
    //obtego los datos de la session que estan en el localStorage
    let datosString = localStorage.getItem("datosSesion");
    //valido si existe la informacion en el localStorage con la llave datosSesion
    if(datosString){
      //convierto los datos string un objeto con la funcion parse
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return null;
    }
  }

  //Creo un metodo para eliminar la infomracion del localstorage
  EliminarInformacionSesion(){
    //elimino la informacion del localStorage
    localStorage.removeItem("datosSesion");
    //actualizo la informacion del modeloIdentificar
    this.RefrescarDatosSesion(new ModeloIdentificar());
  }

  seHaIniciadoSesion(){
  //obtego los datos de la session que estan en el localStorage
    let datosString = localStorage.getItem("datosSesion");
  //devuelvo la informacion en el localStorage con la llave datosSesion
    return datosString
  }
  //creo un metodo para obtener el token y compartir con las demas partes de la aplicacion
  ObtenerToken(){
      //obtego los datos de la session que estan en el localStorage
      let datosString = localStorage.getItem("datosSesion");
      //valido si existe la informacion en el localStorage con la llave datosSesion
      if (datosString){
        //convierto los datos string un objeto con la funcion parse
        let datos = JSON.parse(datosString);
        //devuelvo el objecto
        return datos.tk;
      }else{
        return '';
      }
  }

}
