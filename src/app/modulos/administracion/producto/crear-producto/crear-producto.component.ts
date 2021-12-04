import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../../servicios/producto.service';
import { ModeloDatos } from '../../../../modelo/datos.modelo';
import { ModeloProducto } from '../../../../modelo/producto.modelo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  //defino los campos del formulario  y sus restricciones, deber ser igual al modelo
  fgValidador : FormGroup = this.fb.group({
    'nombre' : ['', [Validators.required, Validators.minLength(5)]],
    'precio' : ['', [Validators.required, Validators.min(1)]],
    'imagen' : ['', [Validators.required, Validators.minLength(5)]],
  })
  
  constructor(private fb : FormBuilder,
              private sevicioProducto : ProductoService,
              private router : Router) { }

  ngOnInit(): void {
  }

  //creo una para obtener los datos del formulario
  GuardarProducto(){
    //datos del formulario
    let nombre = this.fgValidador.controls['nombre'].value;
    let precio = parseInt(this.fgValidador.controls['precio'].value);
    let imagen = this.fgValidador.controls['imagen'].value;
    // creo el objecto del modelo producto
    let p = new ModeloProducto()
    p.nombre = nombre;
    p.precio = precio;
    p.imagen = imagen;
    // envio el modelo creado al servicio de crear producto
    this.sevicioProducto.CrearProducto(p).subscribe({
      //si se creo correctamente genera una alerta
      next: (datos : ModeloProducto) => {
        alert("Producto creado con exito");
        //redirecciono a la pagina de productos
        this.router.navigate(['/administracion/listar-producto']);
    },
    //si no se creo genera una alerta
      error: (error : any) => {
        alert("Error al crear el producto");
      }
    });
  }

}
