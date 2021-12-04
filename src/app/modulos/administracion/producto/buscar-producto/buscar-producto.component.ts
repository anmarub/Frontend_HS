import { Component, OnInit } from '@angular/core';
import { ModeloProducto } from '../../../../modelo/producto.modelo';
import { ProductoService } from '../../../../servicios/producto.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  //creo una lista de productos la cual instancion vacia para iniciar
  listadoRegistros : ModeloProducto[] = []

  constructor(private productoServicio : ProductoService) { }

  ngOnInit(): void {
    this.ObtenerListadoProductos()
  }

  //metodo para obtener todos los productos
  ObtenerListadoProductos(){
    //llamo la funcion obtenerRegistros desde la clase productoServicio
    this.productoServicio.obtenerRegistros().subscribe({
      //si todo esta correcto obtengo la respuesta y asigno el resultado a datos
      next: (datos: ModeloProducto[]) => {
        this.listadoRegistros = datos
      }
    })
  }

}
