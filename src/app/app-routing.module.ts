import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallaInicioComponent } from './components/pantalla-inicio/pantalla-inicio.component';
import { pantallaProfesorComponent } from './components/pantalla-profesor/pantalla-profesor.component';
import { PantallaEstudianteComponent } from './components/pantalla-estudiante/pantalla-estudiante.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MateriasComponent } from './components/materias/materias.component';

const routes: Routes = [
  {path: 'Pantalla-inicio',component:PantallaInicioComponent},
  {path: 'Pantalla-profesor',component:pantallaProfesorComponent},
  {path: 'Pantalla-estudiante',component:PantallaEstudianteComponent},
  {path: 'Materias',component:MateriasComponent},
  {path: 'Tabla',component:TablaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
