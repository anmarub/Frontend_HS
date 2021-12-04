import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { BuscarProductoComponent } from './producto/buscar-producto/buscar-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';

const routes: Routes = [
  {
    path: 'crear-persona',
    component: CrearPersonaComponent
  },
  {
    path: 'editar-persona',
    component: EditarPersonaComponent
  },
  {
    path: 'crear-producto',
    component: CrearProductoComponent
  },
  {
    path: 'editar-producto/:id', // con los ":" se pueden pasar parametros
    component: EditarProductoComponent
  },
  {
    path: 'listar-producto',
    component: BuscarProductoComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
