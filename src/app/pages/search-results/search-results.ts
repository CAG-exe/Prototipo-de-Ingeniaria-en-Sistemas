import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { MapComponent } from '../../components/map/map';
import { Place } from '../../components/map/map.types';
import { TallerService } from '../../Domain/Services/TallerServices';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const INITIAL_SELECTION_SIZE = 3;

function pickRandom<T>(items: T[], count: number): T[] {
  const copy = [...items];
  const picked: T[] = [];
  while (picked.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(index, 1)[0]);
  }
  return picked;
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResults {
  protected readonly allPlaces = signal<Place[]>([]);
  protected readonly searchTerm = signal<string>('');
  protected readonly selectedPlaces = signal<Place[]>([]);
  protected readonly highlightedPlace = signal<Place | null>(null);
  private readonly viewportPlaces = signal<Place[]>([]);

  protected readonly filteredPlaces = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.allPlaces();
    return this.allPlaces().filter(p => 
      p.nombre.toLowerCase().includes(term) || 
      p.rubro.toLowerCase().includes(term) ||
      p.direccion.toLowerCase().includes(term)
    );
  });

  protected readonly otherPlaces = computed<Place[]>(() => {
    const selected = new Set(this.selectedPlaces());
    const highlighted = this.highlightedPlace();
    const others = this.viewportPlaces().filter((p) => !selected.has(p));
    if (highlighted && !selected.has(highlighted) && !others.includes(highlighted)) {
      others.push(highlighted);
    }
    return others;
  });

  private readonly listEl = viewChild.required<ElementRef<HTMLElement>>('listEl');

  constructor(private tallerService: TallerService) {
    this.tallerService.workshops$.pipe(takeUntilDestroyed()).subscribe((data) => {
      const places: Place[] = data.map((t) => ({
        ...t,
        direccion: t.direccionesNormalizadas[0]?.direccion || '',
        position: t.direccionesNormalizadas[0]
          ? {
              lat: t.direccionesNormalizadas[0].coordenadas.y,
              lng: t.direccionesNormalizadas[0].coordenadas.x,
            }
          : null,
      }));

      this.allPlaces.set(places);
      if (this.selectedPlaces().length === 0 && places.length > 0) {
        this.selectedPlaces.set(pickRandom(places, INITIAL_SELECTION_SIZE));
      }
    });
  }

  protected onPlacesInViewport(places: Place[]): void {
    this.viewportPlaces.set(places);
    this.scrollToHighlighted();
  }

  private scrollToHighlighted(): void {
    const place = this.highlightedPlace();
    if (!place) return;
    queueMicrotask(() => {
      const el = this.listEl().nativeElement.querySelector<HTMLElement>(
        `[data-place="${CSS.escape(place.nombre)}"]`,
      );
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  protected onPlaceClick(place: Place): void {
    this.highlightedPlace.update((current) => (current === place ? null : place));
  }

  protected onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

}
