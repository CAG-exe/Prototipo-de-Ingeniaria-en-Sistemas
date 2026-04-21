export interface INominatimAddress {
  road?: string;
  house_number?: string;
  quarter?: string;
  suburb?: string;
  town?: string;
  city?: string;
  state_district?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
  [key: string]: string | undefined;
}

export interface INominatimDireccion {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: INominatimAddress;
  boundingbox: [string, string, string, string];
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
  direccion: INominatimDireccion | null;
}
