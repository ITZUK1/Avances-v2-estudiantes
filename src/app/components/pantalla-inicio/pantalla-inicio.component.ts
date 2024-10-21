import { Component } from '@angular/core';

@Component({
  selector: 'app-pantalla-inicio',
  templateUrl: './pantalla-inicio.component.html',
  styleUrls: ['./pantalla-inicio.component.css']
})
export class PantallaInicioComponent {
  teacherId: string = '';
  teacherErrorMessage: string | null = null;
  teacherStatus: boolean = false; // Valor por defecto

  studentId: string = '';
  studentErrorMessage: string | null = null;
  studentStatus: boolean = false; // Valor por defecto

  showModal: boolean = false; 
  fullName: string = '';
  subject: string = '';
  identification: string = '';

  stopPropagation(event: Event) {
    event.stopPropagation(); 
  }

  onSubmitTeacher(): void {
    this.teacherErrorMessage = this.validateId(this.teacherId, 'profesor');
    if (!this.teacherErrorMessage) {
      // Aquí realizarías la llamada al servicio para guardar la información del profesor
      console.log('Información del profesor enviada:', { id: this.teacherId, status: this.teacherStatus });
      this.teacherId = ''; // Limpiar el campo después del envío
    }
  }

  onSubmitStudent(): void {
    this.studentErrorMessage = this.validateId(this.studentId, 'estudiante');
    if (!this.studentErrorMessage) {
      // Aquí realizarías la llamada al servicio para guardar la información del estudiante
      console.log('Información del estudiante enviada:', { id: this.studentId, status: this.studentStatus });
      this.studentId = ''; // Limpiar el campo después del envío
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
    // Agregar más validaciones si es necesario (ej. longitud, formato)
    return null;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmitRegistration() {
    // Here you'll handle the submission of the registration form
    console.log('Registration Data:', {
      fullName: this.fullName,
      subject: this.subject,
      identification: this.identification
    });

    // Close the modal after successful registration
    this.closeModal();

    // Clear the input fields
    this.fullName = '';
    this.subject = '';
    this.identification = '';
  }
}