import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITallerCultural, IGeorefDireccion } from '../../Domain/Interfaces/ITallerCultural';
import { RouterLink, Router } from '@angular/router';
import { TallerService } from '../../Domain/Services/TallerServices';
import { UserService } from '../../Domain/Services/UsersServices';
import { NgIf, NgFor } from '@angular/common';
import { SafePipe } from '../../Shared/Pipes/safe.pipe';
import { ChangeDetectorRef } from '@angular/core';
import { MapService } from '../../components/map/map.service';

@Component({
  selector: 'app-formulario-inscripcion-talleres',
  imports: [FormsModule, RouterLink, NgIf, NgFor, SafePipe],
  templateUrl: './formulario-inscripcion-talleres.html',
  styleUrl: './formulario-inscripcion-talleres.css',
})
export class FormularioInscripcionTalleres {
  imagenBase64: string = '';
  imagen: string = '';
  rubro: string = '';
  esCentroCultural: boolean = false;
  tieneRedSocial: boolean = false;

  direccionQuery: string = '';
  sugerencias: IGeorefDireccion[] = [];
  buscandoDireccion: boolean = false;
  mostrarSugerencias: boolean = false;
  sinResultados: boolean = false;

  direccionSeleccionada: IGeorefDireccion | null = null;


  private readonly DIRECCION_CENTRO_CULTURAL_DEFAULT: IGeorefDireccion = {
    nomenclatura: 'JUAN MARIA GUTIERREZ 1150, MALVINAS ARGENTINAS, BUENOS AIRES',
    calle: { id: '0651501000850', nombre: 'JUAN MARIA GUTIERREZ', categoria: 'CALLE' },
    altura: { valor: 1150, unidad: null },
    localidad_censal: { id: '06515010', nombre: 'LOS POLVORINES' },
    departamento: { id: '06515', nombre: 'MALVINAS ARGENTINAS' },
    provincia: { id: '06', nombre: 'BUENOS AIRES' },
    ubicacion: { lat: -34.5222, lon: -58.7000 }
  };

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

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
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private mapService: MapService,
  ) {}

  saveWorkshop() {
    const workshops = this.tallerService.workshops;
    const proximoId =
      workshops.length > 0 ? Math.max(...workshops.map((t) => t.id)) + 1 : 1;

    const nuevoTaller: ITallerCultural = {
      id: proximoId,
      nombre: this.nombreTaller,
      imagen: this.imagenBase64 || '',
      rubro: this.rubro,
      telefono: this.telefono,
      email: this.correoElectronico,
      atencion: this.horariosTexto,
      descripcion: this.descripcion || '',
      habilitado: false,
      redesSociales: this.tieneRedSocial ? this.redSocial + '/' + this.nickname : '',
      direccion: this.direccionSeleccionada,
    };

    this.tallerService.addWorkshop(nuevoTaller);
    this.userService.addWorkshopToCurrentUser(nuevoTaller.id);

    this.router.navigate(['/*']);
  }

  clearDirection() {
    if (this.esCentroCultural) {
      this.direccionQuery = this.DIRECCION_CENTRO_CULTURAL_DEFAULT.nomenclatura;
      this.direccionSeleccionada = this.DIRECCION_CENTRO_CULTURAL_DEFAULT;
      this.sugerencias = [];
      this.mostrarSugerencias = false;
      this.sinResultados = false;
    } else {
      this.direccionQuery = '';
      this.direccionSeleccionada = null;
    }
  }

  haveRedSocial() {
    this.tieneRedSocial = this.redSocial !== '' && this.redSocial !== 'ninguna';
    if (!this.tieneRedSocial) {
      this.nickname = '';
    }
  }

  onDireccionInput() {
    this.direccionSeleccionada = null;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    if (!this.direccionQuery.trim()) {
      this.sugerencias = [];
      this.mostrarSugerencias = false;
      this.buscandoDireccion = false;
      this.sinResultados = false;
      return;
    }

    this.buscandoDireccion = true;
    this.sinResultados = false;
    this.debounceTimer = setTimeout(async () => {
      this.sugerencias = await this.mapService.search(this.direccionQuery, 10);
      this.buscandoDireccion = false;
      this.mostrarSugerencias = this.sugerencias.length > 0;
      this.sinResultados = this.sugerencias.length === 0;
      this.cdr.detectChanges();
    }, 500);
  }

  formatearDireccion(dir: IGeorefDireccion): string {
    return dir.nomenclatura;
  }

  seleccionarDireccion(dir: IGeorefDireccion) {
    this.sugerencias = [];
    this.mostrarSugerencias = false;
    this.sinResultados = false;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.direccionQuery = this.formatearDireccion(dir);
    this.direccionSeleccionada = dir;
  }

  cerrarSugerencias() {
    setTimeout(() => {
      this.mostrarSugerencias = false;
    }, 150);
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
