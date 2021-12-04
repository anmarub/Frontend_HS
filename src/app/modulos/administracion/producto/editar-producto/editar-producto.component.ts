import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelo/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  //defino la variable que almacenara el id de la ruta del producto
  id : string = ''; 
 //defino los campos del formulario  y sus restricciones, deber ser igual al modelo
 fgValidador : FormGroup = this.fb.group({
  'id' : ['', [Validators.required]], 
  'nombre' : ['', [Validators.required, Validators.minLength(5)]],
  'precio' : ['', [Validators.required, Validators.min(1)]],
  'imagen' : ['', [Validators.required, Validators.minLength(5)]],
})
// importo el servicio de producto para acceder a los metodos de editar producto
// importo el FormBuilder para crear el formulario
// importo el router para redireccionar la pagina
// importo el ActiveRoute para obtener el id de la ruta
constructor(private fb : FormBuilder,
            private sevicioProducto : ProductoService,
            private router : Router,
            private idRouter : ActivatedRoute) { }

ngOnInit(): void {
  // obtengo el id de la ruta con snapshot.params traido de ActivatedRoute
  // ['id'] debe ser el mismo nombre del archivo de enrutamiento definido
  this.id = this.idRouter.snapshot.params['id'];
  this.buscarProducto();
}
//defino un metodo para buscar el producto por id
buscarProducto(){
  //llamo el metodo de obtener producto por id y paso el id que esta en la variable id de la ruta
  this.sevicioProducto.obtenerRegistrosPorId(this.id).subscribe({
    next: (datos : ModeloProducto) => {
      //si todo sale bien asigno los datos del producto a los campos del formulario
      this.fgValidador.controls['id'].setValue(this.id);
      this.fgValidador.controls['nombre'].setValue(datos.nombre);
      this.fgValidador.controls['precio'].setValue(datos.precio);
      this.fgValidador.controls['imagen'].setValue(datos.imagen);
    }
  });
}

//creo una para obtener los datos del formulario
EditarProducto(){
  //datos del formulario
  let nombre = this.fgValidador.controls['nombre'].value;
  let precio = parseInt(this.fgValidador.controls['precio'].value);
  let imagen = this.fgValidador.controls['imagen'].value;
  // creo el objecto del modelo producto
  let p = new ModeloProducto()
  p.id = this.id;
  p.nombre = nombre;
  p.precio = precio;
  p.imagen = imagen;
  // envio el modelo creado al servicio de crear producto
  this.sevicioProducto.ActualizarProducto(p).subscribe({
    //si se creo correctamente genera una alerta
    next: (datos : ModeloProducto) => {
      alert("Producto Actualizador con exito");
      //redirecciono a la pagina de productos
      this.router.navigate(['/administracion/listar-producto']);
  },
  //si no se creo genera una alerta
    error: (error : any) => {
      alert("Error al Actualizar el producto");
    }
  });
}
}
