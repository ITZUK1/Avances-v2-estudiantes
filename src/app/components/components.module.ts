import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pantallaProfesorComponent } from './pantalla-profesor/pantalla-profesor.component';
import { PantallaEstudianteComponent } from './pantalla-estudiante/pantalla-estudiante.component';



@NgModule({
  declarations: [
    pantallaProfesorComponent,
    PantallaEstudianteComponent,
   
    
    
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
