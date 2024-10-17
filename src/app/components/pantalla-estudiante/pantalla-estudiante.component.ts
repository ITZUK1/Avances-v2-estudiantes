import { Component, ViewChild, ElementRef } from '@angular/core';

interface Subject {
  name: string;
  status: string;
}

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
  isOnline: boolean = false;
  avatarURL: string | ArrayBuffer | null = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiy7RvfhkOomVFRffPKb1pG60VDg24jOwVQQ&s'; // URL de imagen de ejemplo

  @ViewChild('fileInput') fileInput!: ElementRef;

  subjects: Subject[] = [
    { name: 'Matemáticas', status: 'Aprobada' },
    { name: 'Física', status: 'En curso' },
    { name: 'Química', status: 'Reprobada' },
    { name: 'Historia', status: 'Aprobada' },
    { name: 'Literatura', status: 'En curso' },
    { name: 'Biología', status: 'Aprobada' }
  ];

  showPopup: boolean = false;

  onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.avatarURL = e.target.result;
        }
      };
      reader.readAsDataURL(target.files[0]);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  checkOnlineStatus() {
    this.isOnline = !this.isOnline;
  }

  showSubjectsPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}