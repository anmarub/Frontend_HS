import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../servicios/seguridad.service';
import { ModeloDatos } from '../../modelo/datos.modelo';
import { ModeloIdentificar } from '../../modelo/identificar.modelo';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  //instancion una variable que me permitira saber si el usuario esta logueado o no
  // por defecto esta false
  seInicioSesion : boolean = false

  // Instancion un metodo de Subcription para poder recibir los cambios de la variable
  subs : Subscription = new Subscription();

  // instancio en constructor el servicio de seguridad el cual tiene un metodo para saber si el usuario esta logueado
  constructor(private seguridadServico : SeguridadService) { }

  ngOnInit(): void {
    //la variable de tipo suscripcion le asigno el valor que devuelve el metodo de seguridad
    //subscribe la respuesta obtenida y valido
    this.subs = this.seguridadServico.ObtenerDatosUsuarioEnSession().subscribe({
      next: (datos : ModeloIdentificar) => {
        //si el usuario esta logueado paso la informacion del localstorage a la variable de tipo modelo
        this.seInicioSesion = datos.estaIdentificado;
      }
    })
  }

}
