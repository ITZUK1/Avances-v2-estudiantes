import { Component } from '@angular/core';

@Component({
  selector: 'app-pantalla-estudiante',
  templateUrl: './pantalla-estudiante.component.html',
  styleUrls: ['./pantalla-estudiante.component.css']
})
export class PantallaEstudianteComponent {
  studentName: string = 'Juan Pérez';
  studentId: string = '123456';
  date: string = '12/10/2024';
  phone: string = '123-456-7890';
  isOnline: boolean | null = null; // null si no se ha verificado
  avatarURL: string | ArrayBuffer | null = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiy7RvfhkOomVFRffPKb1pG60VDg24jOwVQQ&s'; // URL predet para la foto

  // Método para cargar la imagen
  onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
  
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) { // Verifica que result no sea undefined
          this.avatarURL = e.target.result; // Asigna la imagen leída
        }
      };
      reader.readAsDataURL(target.files[0]);
    }
  }
  

  // Método para verificar si está en línea
  checkOnlineStatus() {
    this.isOnline = Math.random() >= 0.5; // Simular el estado en línea (50% de probabilidad)
  }
}
