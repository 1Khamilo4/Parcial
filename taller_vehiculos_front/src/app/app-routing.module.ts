import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { MecanicoComponent } from './pages/mecanico/mecanico.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';

const routes: Routes = [
  {
    path: "clientes",
    component:ClienteComponent
   
  },
  {
    path: "mecanicos",
    component:MecanicoComponent,
    pathMatch:"full"
  },
  {
    path: "vehiculos",
    component:VehiculoComponent,
    pathMatch:"full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
