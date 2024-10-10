import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallaInicioComponent } from './components/pantalla-inicio/pantalla-inicio.component';
import { pantallaProfesorComponent } from './components/pantalla-profesor/pantalla-profesor.component';
import { PantallaEstudianteComponent } from './components/pantalla-estudiante/pantalla-estudiante.component';
import { TablaComponent } from './components/tabla/tabla.component';

const routes: Routes = [
  {path: 'pantalla-inicio',component:PantallaInicioComponent},
  {path: 'app-pantalla-profesor',component:pantallaProfesorComponent},
  {path: 'pantalla-estudiante',component:PantallaEstudianteComponent},
  {path: 'tabla',component:TablaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
