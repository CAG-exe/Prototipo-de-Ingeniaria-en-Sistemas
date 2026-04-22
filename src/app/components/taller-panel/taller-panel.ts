import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ITallerCultural, formatDireccion } from '../../Domain/Interfaces/ITallerCultural';

@Component({
  selector: 'app-taller-panel',
  standalone: true,
  templateUrl: './taller-panel.html',
  styleUrl: './taller-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TallerPanel {
  readonly place = input.required<ITallerCultural>();
  readonly cerrar = output<void>();
  readonly formatDireccion = formatDireccion;
}
