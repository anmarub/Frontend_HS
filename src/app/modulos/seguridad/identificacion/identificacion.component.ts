import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  // permite crear formularios reactivos, lo que modique en el componente
  // se refleje en el formulario y viseversa.
  fgValidador: FormGroup = this.fb.group({
    //ingreso los campos que va tener el formulario con su respectivas validaciones
    // tales como requerido, minlength, maxlength, etc.
    'usuario': ['', [Validators.required, Validators.email]], //en el formulario debe ser el mismo nombre que en el modelo
    'clave': ['', [Validators.required, Validators.minLength(6)]]
  });
  //inyecto lo metodos que necesito para utilizar las funciones
  // 1) inyecto FormBuilder el cual fb va heredar todas las funciones de la clase
  //2) inyecto mi servicio de autenticacion seguridad.service servicioSeguridad va heredar todas las funciones de la clase
  constructor(private fb: FormBuilder, 
              private servicioSeguridad: SeguridadService,
              private router : Router) { }

  // se ejecuta cuando se inicia el componente
  ngOnInit(): void {

    //Ejemplo de funcionamiento cambio en .Ts y como afecta el formulario
    // creo un intervalo para que cada segundo se ejecute la funcion
    //setInterval(() => {
      //desde la funcion fgValidador se accede al campo usuario y cambio el valor por la generada
      // en la funcion random
      //this.fgValidador.controls['usuario'].setValue(Math.random() *1000 );
    //}, 2000);
  }

  // metodo para identificar usuario
  // 1) obtener los datos usuario y clave desde el formulario
  IdentificarUsuario() {
    // defino la variable que me tomara el valor del formulario
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    // Cifro la contraseña con MD5 importada de crypto-js
    let cifrarClave = MD5(clave).toString();
    // llamo al metodo de autenticacion del servicio seguridad.service
    //paso los parametros de usuario y clave cifradas
    //como es un Observable debo suscribirme para poder recibir la respuesta
    this.servicioSeguridad.IdentificarUsuario(usuario, cifrarClave).subscribe({
      next: (datos : any) => {
              // si el resultado es correcto llamo el metodo de AlmacenarUsuario que viene del servicioSeguridad
      // esto guarda la informacion session en el localStorage
      this.servicioSeguridad.AlmacenarSesion(datos);
      // si el resultado es correcto redirecciono a la pagina principal
      this.router.navigate(['/inicio']);
      },
      error: (error: any) => {
        // si el resultado es incorrecto
      alert("Datos invalidos");
      }
    });
  }

}
