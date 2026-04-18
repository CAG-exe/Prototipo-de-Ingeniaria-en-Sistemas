import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-inscripcion-talleres',
  imports: [RouterLink, FormsModule],
  templateUrl: './formulario-inscripcion-talleres.html',
  styleUrl: './formulario-inscripcion-talleres.css',
})
export class FormularioInscripcionTalleres {
    esCentroCultural: boolean = false;
    tieneRedSocial: boolean = false;
    
    calle : string = '';
    altura : number | null = null
    localidad : string = '';
    nombreTaller: string = '';
    correoElectronico: string = '';
    telefono: string = '';
    redSocial: string = '';
    nickname: string = '';
    descripcion: string = '';


    lunes: boolean = false;
    martes: boolean = false
    miercoles: boolean = false;
    jueves: boolean = false
    viernes: boolean = false;

    //Sarmiento 118 , san martin , direccion previs para el centro cultural 

    limpiarDireccion() {
        if (this.esCentroCultural) {
            this.calle = '';
            this.altura = null;
            this.localidad = '';
        }
    }

    haveRedSocial() {
      this.tieneRedSocial = this.redSocial !== '' && this.redSocial !== 'ninguna';
      if (!this.tieneRedSocial) {
        this.nickname = '';
      }
    }

    activadoLunes() {
      this.lunes = !this.lunes;
    }
    
    activadoMartes() {
      this.martes = !this.martes;
    }
    
    activadoMiercoles() {
      this.miercoles = !this.miercoles;
    }
    
    activadoJueves() {
      this.jueves = !this.jueves;
    }
    
    activadoViernes() {
      this.viernes = !this.viernes;
    }


}


