export interface ICoordenadas {
  srid: number;
  x: number;
  y: number;
}

export interface IDireccionNormalizada {
  altura: number;
  cod_calle: number;
  cod_calle_cruce?: number | null;
  cod_partido: string;
  coordenadas: ICoordenadas;
  direccion: string;
  nombre_calle: string;
  nombre_calle_cruce?: string;
  nombre_localidad: string;
  nombre_partido: string;
  tipo: string;
}

export interface ISocialMedia {
  redSocial: string;
  nickname: string;
}

export interface ITallerCultural {
  id: number;
  nombre: string;
  imagen: string;
  rubro: string;
  telefono: string;
  email: string;
  atencion: string;
  redesSociales: ISocialMedia[];
  descripcion: string;
  habilitado: boolean;
  direccionesNormalizadas: IDireccionNormalizada[];
}
