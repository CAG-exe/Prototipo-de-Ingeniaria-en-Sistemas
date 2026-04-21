import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { Place } from './map.types';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrl: './map.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit, OnDestroy {
  readonly places = input.required<Place[]>();
  readonly selectedPlaces = input<Place[]>([]);
  readonly highlightedPlace = input<Place | null>(null);
  readonly placesInViewport = output<Place[]>();
  readonly placeClicked = output<Place>();

  private readonly mapEl = viewChild.required<ElementRef<HTMLDivElement>>('mapEl');
  private map: L.Map | null = null;
  private markers = new Map<Place, L.Marker>();
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    effect(() => {
      const places = this.places();
      if (this.map) this.load(places);
    });

    effect(() => {
      const highlighted = this.highlightedPlace();
      const selected = new Set(this.selectedPlaces());
      this.markers.forEach((m, p) => m.setIcon(icon(state(p, selected, highlighted))));
      if (highlighted) {
        const marker = this.markers.get(highlighted);
        if (marker && this.map) {
          const point = this.map.latLngToContainerPoint(marker.getLatLng());
          const target = point.subtract([DETAIL_PANEL_WIDTH / 2, 0]);
          this.map.panTo(this.map.containerPointToLatLng(target));
        }
      }
    });
  }

  ngAfterViewInit(): void {
    const el = this.mapEl().nativeElement;
    this.map = L.map(el, { zoomControl: false }).setView([-34.6037, -58.3816], 11);
    L.control.zoom({ position: 'topright' }).addTo(this.map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(this.map);

    this.map.on('moveend', () => this.emit());

    this.resizeObserver = new ResizeObserver(() => this.map?.invalidateSize());
    this.resizeObserver.observe(el);

    this.load(this.places());
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
  }

  private load(places: Place[]): void {
    if (!this.map) return;
    this.markers.forEach((m) => m.remove());
    this.markers.clear();

    const selected = new Set(this.selectedPlaces());
    const highlighted = this.highlightedPlace();
    const bounds = L.latLngBounds([]);

    for (const place of places) {
      if (!place.position || !this.map) continue;
      const pos: [number, number] = [place.position.lat, place.position.lng];
      const marker = L.marker(pos, { icon: icon(state(place, selected, highlighted)) }).addTo(this.map);
      marker.on('click', () => this.placeClicked.emit(place));
      this.markers.set(place, marker);
      if (selected.size === 0 || selected.has(place)) bounds.extend(pos);
    }

    if (bounds.isValid()) this.map.fitBounds(bounds, { padding: [32, 32], maxZoom: 15 });
  }

  private emit(): void {
    if (!this.map) return;
    const bounds = this.map.getBounds();
    const visible: Place[] = [];
    this.markers.forEach((m, p) => {
      if (bounds.contains(m.getLatLng())) visible.push(p);
    });
    this.placesInViewport.emit(visible);
  }
}

const DETAIL_PANEL_WIDTH = 360;

type PinState = 'selected' | 'other' | 'highlighted';

function state(place: Place, selected: Set<Place>, highlighted: Place | null): PinState {
  if (place === highlighted) return 'highlighted';
  if (selected.has(place)) return 'selected';
  return 'other';
}

const COLORS: Record<PinState, string> = {
  highlighted: '#ef4444',
  selected: '#16a34a',
  other: '#2563eb',
};

function icon(pinState: PinState): L.DivIcon {
  const size = pinState === 'highlighted' ? 32 : 22;
  const color = COLORS[pinState];
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.5);"></div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}
