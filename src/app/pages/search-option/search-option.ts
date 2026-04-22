import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ITallerCultural, formatDireccion } from '../../Domain/Interfaces/ITallerCultural';

@Component({
  selector: 'app-search-option',
  templateUrl: './search-option.html',
  styleUrl: './search-option.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchOption {
  readonly taller = input.required<ITallerCultural>();
  readonly selected = input<boolean>(false);
  readonly formatDireccion = formatDireccion;
}
