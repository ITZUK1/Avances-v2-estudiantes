import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pantalla-inicio',
  templateUrl: './pantalla-inicio.component.html',
  styleUrls: ['./pantalla-inicio.component.css']
})
export class PantallaInicioComponent {
  teacherId: string = '';
  teacherErrorMessage: string | null = null;
  teacherStatus: boolean = false;

  studentId: string = '';
  studentErrorMessage: string | null = null;
  studentStatus: boolean = false;

  showModal: boolean = false;
  fullName: string = '';
  subject: string = '';
  identification: string = '';

  materias: any[] = []; // Array para almacenar las materias

  constructor(private http: HttpClient) {
    this.loadMaterias(); // Carga las materias al iniciar el componente
  }


  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onSubmitTeacher(): void {
    this.teacherErrorMessage = this.validateId(this.teacherId, 'profesor');
    if (!this.teacherErrorMessage) {
      console.log('Información del profesor enviada:', { id: this.teacherId, status: this.teacherStatus });
      this.teacherId = '';
    }
  }

  onSubmitStudent(): void {
    this.studentErrorMessage = this.validateId(this.studentId, 'estudiante');
    if (!this.studentErrorMessage) {
      console.log('Información del estudiante enviada:', { id: this.studentId, status: this.studentStatus });
      this.studentId = '';
    }
  }

  getStatusTextTeacher(): string {
    return this.teacherStatus ? 'Online' : 'Offline';
  }

  getStatusTextStudent(): string {
    return this.studentStatus ? 'Online' : 'Offline';
  }

  private validateId(id: string, type: 'profesor' | 'estudiante'): string | null {
    if (!id) {
      return `Por favor, ingresa un ID de ${type} válido.`;
    }
    return null;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmitRegistration() {
    const newTeacher = {
      codigo_id: this.identification,
      nombre: this.fullName,
      fecha: new Date().toISOString().slice(0, 10),
      telefono: '', // O maneja la lógica si es opcional.  Podrías agregar un campo de input en el formulario para el teléfono
      status: true, // O false, según la lógica de tu aplicación
      materia_id: this.getSubjectId(this.subject)
    };

    this.http.post('http://localhost:3000/tables', newTeacher).subscribe(
      (response) => {
        console.log('Profesor registrado:', response);
        this.closeModal();
        this.fullName = '';
        this.subject = '';
        this.identification = '';
      },
      (error) => {
        console.error('Error al registrar profesor:', error);
        // Maneja el error, por ejemplo, muestra un mensaje al usuario.
      }
    );
  }

  private getSubjectId(subjectName: string): number {
    const materia = this.materias.find(m => m.nombre === subjectName);
    return materia ? materia.id : -1;
  }



  private loadMaterias() {
    this.http.get<any[]>('http://localhost:3000/tables').subscribe(
      (materias) => {
        this.materias = materias;
      },
      (error) => {
        console.error('Error al cargar las materias:', error);
        // Maneja el error, quizás mostrando un mensaje al usuario
      }
    );
  }
}