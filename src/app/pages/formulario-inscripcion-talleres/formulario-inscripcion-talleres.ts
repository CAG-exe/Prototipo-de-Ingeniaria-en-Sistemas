import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITallerCultural } from '../../Domain/Interfaces/ITallerCultural';
import { data } from '../../Data/workshops';
import { RouterLink, Router } from '@angular/router';
import { TallerService } from '../../Domain/Services/TallerServices';
import { NgIf } from '@angular/common';
import { SafePipe } from '../../Shared/Pipes/safe.pipe';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-formulario-inscripcion-talleres',
  imports: [FormsModule, RouterLink, NgIf, SafePipe],
  templateUrl: './formulario-inscripcion-talleres.html',
  styleUrl: './formulario-inscripcion-talleres.css',
})
export class FormularioInscripcionTalleres {
  imagenBase64: string = '';
  imagen: string = '';
  rubro: string = '';
  esCentroCultural: boolean = false;
  tieneRedSocial: boolean = false;

  calle: string = '';
  altura: string = '';
  localidad: string = '';
  nombreTaller: string = '';
  correoElectronico: string = '';
  telefono: string = '';
  redSocial: string = '';
  nickname: string = '';
  descripcion: string = '';

  horariosTexto: string = '';
  archivoParaSubir: File | null = null;
  imagenPreview: string | null = null;

  constructor(
    private tallerService: TallerService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  saveWorkshop() {
    const proximoId = data.length > 0 ? Math.max(...data.map((t) => t.id)) + 1 : 1;

    const nuevoTaller: ITallerCultural = {
      id: proximoId,
      nombre: this.nombreTaller,
      imagen: this.imagenBase64 || '',
      rubro: this.rubro,
      telefono: this.telefono,
      email: this.correoElectronico,
      atencion: this.horariosTexto,

      descripcion: this.descripcion || '',
      habilitado: true,
      redesSociales: this.tieneRedSocial ? this.redSocial + '/' + this.nickname : '',
      direccionesNormalizadas: [
        {
          altura: Number(this.altura),
          cod_calle: 0,
          cod_calle_cruce: null,
          cod_partido: '',
          coordenadas: { srid: 4326, x: 0, y: 0 },
          direccion: `${this.calle} ${this.altura}, ${this.localidad}`,
          nombre_calle: this.calle,
          nombre_calle_cruce: '',
          nombre_localidad: this.localidad,
          nombre_partido: '',
          tipo: 'calle_altura',
        },
      ],
    };

    this.tallerService.addWorkshop(nuevoTaller);
    this.router.navigate(['/talleres']);
  }

  clearDirection() {
    if (this.esCentroCultural) {
      this.calle = '';
      this.altura = '';
      this.localidad = '';
    }
  }

  haveRedSocial() {
    this.tieneRedSocial = this.redSocial !== '' && this.redSocial !== 'ninguna';
    if (!this.tieneRedSocial) {
      this.nickname = '';
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagenBase64 = reader.result as string;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.imagenBase64 = '';
  }
}
