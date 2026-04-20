import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, throttleTime } from 'rxjs';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const GEOCODE_DELAY_MS = 1000;

export type LatLng = [number, number];

export interface GeocodeResult {
  displayName: string;
  position: LatLng;
  address: Record<string, string>;
}

interface QueuedRequest {
  address: string;
  resolve: (result: GeocodeResult | null) => void;
  settled: boolean;
}

// Geocodifica direcciones contra Nominatim (OSM) serializando los pedidos
// a través de un Subject con throttleTime para respetar el límite de 1 req/s
// de la política de uso pública. switchMap cancela la request previa si llega
// otra antes de resolver; el AbortController aborta el fetch en vuelo y el
// resolve(null) evita promesas colgadas.
@Injectable({ providedIn: 'root' })
export class MapService {
  private readonly queue = new Subject<QueuedRequest>();

  constructor() {
    this.queue
      .pipe(
        throttleTime(GEOCODE_DELAY_MS, undefined, { leading: true, trailing: true }),
        switchMap((req) => this.fetch$(req)),
      )
      .subscribe();
  }

  geocode(address: string): Promise<GeocodeResult | null> {
    return new Promise((resolve) => {
      this.queue.next({ address, resolve, settled: false });
    });
  }

  private fetch$(req: QueuedRequest): Observable<void> {
    return new Observable<void>((subscriber) => {
      const controller = new AbortController();
      fetchGeocode(req.address, controller.signal)
        .then((result) => {
          if (!req.settled) {
            req.settled = true;
            req.resolve(result);
          }
          subscriber.next();
          subscriber.complete();
        })
        .catch(() => {
          if (!req.settled) {
            req.settled = true;
            req.resolve(null);
          }
          subscriber.next();
          subscriber.complete();
        });
      return () => {
        controller.abort();
        if (!req.settled) {
          req.settled = true;
          req.resolve(null);
        }
      };
    });
  }
}

async function fetchGeocode(address: string, signal: AbortSignal): Promise<GeocodeResult | null> {
  const url = `${NOMINATIM_URL}?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(
    address + ', Argentina',
  )}`;
  const res = await fetch(url, { signal });
  if (!res.ok) return null;
  const data = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
    address: Record<string, string>;
  }>;
  const hit = data[0];
  if (!hit) return null;
  return {
    displayName: hit.display_name,
    position: [parseFloat(hit.lat), parseFloat(hit.lon)],
    address: hit.address,
  };
}
