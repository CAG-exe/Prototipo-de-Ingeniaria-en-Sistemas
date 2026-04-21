import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Place } from '../map/map.types';

@Component({
  selector: 'app-taller-panel',
  standalone: true,
  templateUrl: './taller-panel.html',
  styleUrl: './taller-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TallerPanel {
  readonly place = input.required<Place>();
  readonly cerrar = output<void>();
}
