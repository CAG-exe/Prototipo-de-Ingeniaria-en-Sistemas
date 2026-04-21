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
import { TallerPanel } from '../../components/taller-panel/taller-panel';
import { TallerService } from '../../Domain/Services/TallerServices';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';


function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MapComponent, TallerPanel],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResults {
  protected readonly allPlaces = signal<Place[]>([]);
  protected readonly searchTerm = signal<string>('');
  protected readonly highlightedPlace = signal<Place | null>(null);
  protected readonly panelVisible = signal<boolean>(false);
  private readonly viewportPlaces = signal<Place[]>([]);

  protected readonly hasQuery = computed(() => this.searchTerm().trim() !== '');

  protected readonly selectedPlaces = computed<Place[]>(() => {
    const terms = normalize(this.searchTerm()).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return this.allPlaces().filter(p => {
      const haystack = normalize(`${p.nombre} ${p.direccion}`);
      return terms.every(t => haystack.includes(t));
    });
  });

  protected readonly otherPlaces = computed<Place[]>(() => {
    const selected = new Set(this.hasQuery() ? this.selectedPlaces() : []);
    const highlighted = this.highlightedPlace();
    const others = this.viewportPlaces().filter((p) => !selected.has(p));
    if (highlighted && !selected.has(highlighted) && !others.includes(highlighted)) {
      others.push(highlighted);
    }
    return others;
  });

  private readonly listEl = viewChild.required<ElementRef<HTMLElement>>('listEl');

  constructor(private tallerService: TallerService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const q = params.get('q') ?? '';
      this.searchTerm.set(q);
      if (!q.trim()) this.highlightedPlace.set(null);
    });

    this.tallerService.workshops$.pipe(takeUntilDestroyed()).subscribe((data) => {
      const places: Place[] = data.map((t) => ({
        ...t,
        direccion: t.direccion?.nomenclatura || '',
        position: t.direccion
          ? {
              lat: t.direccion.ubicacion.lat,
              lng: t.direccion.ubicacion.lon,
            }
          : null,
      }));
      this.allPlaces.set(places);
    });
  }

  protected onPlacesInViewport(places: Place[]): void {
    this.viewportPlaces.set(places);
    this.scrollToHighlighted();
    if (this.highlightedPlace()) this.panelVisible.set(true);
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
    const next = this.highlightedPlace() === place ? null : place;
    this.highlightedPlace.set(next);
    this.panelVisible.set(false);
  }

  protected onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.highlightedPlace.set(null);
    this.router.navigate([], {
      queryParams: { q: value || null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

}
