import { Component } from '@angular/core';

@Component({
  selector: 'app-pantalla-inicio',
  templateUrl: './pantalla-inicio.component.html',
  styleUrls: ['./pantalla-inicio.component.css']
})
export class PantallaInicioComponent {
  teacherName: string = 'lolo'; // Opcional, puede ser eliminado si no es necesario
  teacherId: string = ''; // Asegúrate de que sea de tipo string
  status: boolean | null = null; // Correcto para el estado
  

  constructor() {}

  // Método para manejar la presentación del formulario
  onSubmit() {
    // Aquí puedes manejar la lógica para enviar la información o hacer algo con los datos
    console.log(`ID Profesor: ${this.teacherId}, Estado: ${this.status}`);
  }

  // Método para obtener una representación legible del estado
  getStatusText(): string {
    return this.status === null ? 'Desconocido' :
           this.status ? 'Online' : 'Offline';
  }
}
