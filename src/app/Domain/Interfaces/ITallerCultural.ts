export interface IGeorefDireccion {
  nomenclatura: string;
  calle: { id: string; nombre: string; categoria: string };
  altura: { valor: number; unidad: string | null };
  localidad_censal: { id: string; nombre: string };
  departamento: { id: string; nombre: string };
  provincia: { id: string; nombre: string };
  ubicacion: { lat: number; lon: number };
}

export interface ITallerCultural {
  id: number;
  nombre: string;
  imagen: string;
  rubro: string;
  telefono: string;
  email: string;
  atencion: string;
  redesSociales: string;
  descripcion: string;
  habilitado: boolean;
  direccion: IGeorefDireccion | null;
}
