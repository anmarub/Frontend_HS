import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';

const routes: Routes = [
  //defino mis rutas
  {
    path:"inicio", // nos llegue una url
    component: InicioComponent //inicie este componente
  },
  {
    path:"", //redireccionar la ruta principal
    pathMatch: 'full',  //coincidencia exacta o completa
    redirectTo: '/inicio' // nos redireccion a esta ruta especiica
  },
  //cargar el resto de rutas con sus modulos con lazy loading (Estrategia)
  {
    path: 'seguridad',
    loadChildren: () => import("./modulos/seguridad/seguridad.module").then(x => x.SeguridadModule)
  },
  {
    path: 'administracion',
    loadChildren: () => import("./modulos/administracion/administracion.module").then(x => x.AdministracionModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import("./modulos/pedidos/pedidos.module").then(x => x.PedidosModule)
  },
  //comodines o rutas que no existen y puedo reenviarla a un error o ruta especifica
  {
    path:"**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
