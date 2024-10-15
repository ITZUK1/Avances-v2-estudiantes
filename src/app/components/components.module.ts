import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallaInicioComponent } from './pantalla-inicio/pantalla-inicio.component';
import { pantallaProfesorComponent } from './pantalla-profesor/pantalla-profesor.component';
import { PantallaEstudianteComponent } from './pantalla-estudiante/pantalla-estudiante.component';



@NgModule({
  declarations: [
    PantallaInicioComponent,
    pantallaProfesorComponent,
    PantallaEstudianteComponent,
   
    
    
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
