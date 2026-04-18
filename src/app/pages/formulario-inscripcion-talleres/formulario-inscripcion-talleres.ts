import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITallerCultural } from '../../Domain/Interfaces/IWorkshopDetail';
import { HttpClient } from '@angular/common/http';
import { data } from '../../Data/workshops';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-inscripcion-talleres',
  imports: [FormsModule, RouterLink],
  templateUrl: './formulario-inscripcion-talleres.html',
  styleUrl: './formulario-inscripcion-talleres.css',
})
export class FormularioInscripcionTalleres {
  private http = inject(HttpClient);

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

  limpiarDireccion() {
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

  capturarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoParaSubir = file;
      this.imagen = `images/talleres/${file.name}`;

      // Generar vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      console.log('Imagen lista para subir:', this.imagen);
    }
  }

  registrarTaller() {
    if (this.archivoParaSubir) {
      const formData = new FormData();
      formData.append('image', this.archivoParaSubir);

      this.http.post('http://localhost:3000/upload', formData).subscribe({
        next: (res: any) => {
          console.log('Imagen guardada:', res.path);
          this.guardarDatosEnArchivo();
        },
        error: (err) => {
          console.error('Error al subir la imagen:', err);
          alert('Error: El servidor de persistencia no está respondiendo.');
        },
      });
    } else {
      this.guardarDatosEnArchivo();
    }
  }

  private guardarDatosEnArchivo() {

    const proximoId = data.length > 0 ? Math.max(...data.map((t) => t.id)) + 1 : 1;

    const nuevoTaller: ITallerCultural = {
      id: proximoId,
      nombre: this.nombreTaller,
      imagen: this.imagen || 'https://images.unsplash.com/photo-1511192336575-5a79af67a629',
      rubro: this.rubro,
      telefono: this.telefono,
      email: this.correoElectronico,
      atencion: this.horariosTexto,


      descripcion: this.descripcion || '',
      habilitado: true,
      redesSociales: this.tieneRedSocial
        ? [
            {
              redSocial: this.redSocial,
              nickname: this.nickname,
            },
          ]
        : [],

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

    this.http.post('http://localhost:3000/save-workshop', nuevoTaller).subscribe({
      next: () => {
        console.log('Taller guardado permanentemente en workshops.ts');
        alert('Taller registrado y guardado permanentemente.');
        // Aquí podrías redirigir a la lista de talleres
      },
      error: (err) => {
        console.error('Error al persistir datos:', err);
        alert('La imagen se subió pero no se pudo guardar el texto en workshops.ts');
      },
    });
  }
}
