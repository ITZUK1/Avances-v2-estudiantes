import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallaProfesorComponent } from './pantalla-profesor/pantalla-profesor.component';
import { PantallaEstudianteComponent } from './pantalla-estudiante/pantalla-estudiante.component';
import { TablaComponent } from './tabla/tabla.component';



@NgModule({
  declarations: [
    PantallaProfesorComponent,
    PantallaEstudianteComponent,
    TablaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
