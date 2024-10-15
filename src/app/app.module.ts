import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MateriasComponent } from './components/materias/materias.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { PantallaInicioComponent } from './components/pantalla-inicio/pantalla-inicio.component';  // Asegúrate de importar tu componente

@NgModule({
  declarations: [
    AppComponent,
    MateriasComponent,
    TablaComponent,
    PantallaInicioComponent // Asegúrate de declarar aquí tu componente que utiliza formularios
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
