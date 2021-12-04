import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  //inyectamos el servicio de seguridad y el router
  constructor(private servicioSeguridad : SeguridadService,
              private router : Router) { }

  ngOnInit(): void {
    //elimino la sesion del usuario
    this.servicioSeguridad.EliminarInformacionSesion();
    //redirecciono al login
    this.router.navigate(['/inicio']);
  }

}
