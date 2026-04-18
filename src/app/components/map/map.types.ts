export interface LatLng {
  lat: number;
  lng: number;
}

export interface Place {
  nombre: string;
  direccion: string;
  position?: LatLng | null;
  [key: string]: unknown;
}
