import { Injectable } from '@angular/core';
import { IGeorefDireccion } from '../../Domain/Interfaces/ITallerCultural';

@Injectable({ providedIn: 'root' })
export class MapService {
  async search(query: string, limit = 10): Promise<IGeorefDireccion[]> {
    if (!query.trim()) return [];
    return fetchGeoref(new URLSearchParams({ direccion: query, max: String(limit) }));
  }
}

async function fetchGeoref(params: URLSearchParams): Promise<IGeorefDireccion[]> {
  try {
    const res = await fetch(`https://apis.datos.gob.ar/georef/api/direcciones?${params}`);
    if (!res.ok) return [];
    const data = (await res.json()) as { direcciones: IGeorefDireccion[] };
    return data.direcciones ?? [];
  } catch {
    return [];
  }
}
