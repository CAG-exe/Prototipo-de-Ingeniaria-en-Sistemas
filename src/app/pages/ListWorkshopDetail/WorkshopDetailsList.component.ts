import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ITallerCultural } from '../../Domain/Interfaces/ITallerCultural';
import { data } from '../../Data/workshops';
import { WorkshopDetailComponent } from '../WorkshopDetail/WorkshopDetail.component';

@Component({
  standalone: true,
  selector: 'app-workshop-details-list',
  templateUrl: './WorkshopDetailsList.component.html',
  imports: [CommonModule, WorkshopDetailComponent],
})
export class WorkshopDetailsListComponent {
  readonly details = signal<ITallerCultural[]>(data);

  trackByNombre(index: number, item: ITallerCultural) {
    return item.nombre;
  }
}
