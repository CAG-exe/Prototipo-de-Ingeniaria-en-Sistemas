import { Component, OnInit, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITallerCultural } from '../../Domain/Interfaces/ITallerCultural';
import { SafePipe } from '../../Shared/Pipes/safe.pipe';
import { TallerService } from '../../Domain/Services/TallerServices';

@Component({
  standalone: true,
  selector: 'app-workshop-detail',
  templateUrl: './WorkshopDetail.component.html',
  styleUrls: ['./WorkshopDetail.component.css'],
  imports: [CommonModule, SafePipe],
})
export class WorkshopDetailComponent implements OnInit {
  readonly detailInput = input<ITallerCultural>(undefined, { alias: 'detail' });
  readonly id = input<string>(); // Recibe el ID desde la ruta si existe

  private workshopDetail = signal<ITallerCultural | undefined>(undefined);

  constructor(private workshopService: TallerService) {}

  ngOnInit() {
    if (this.detailInput()) {
      this.workshopDetail.set(this.detailInput());
    } else if (this.id()) {
      const found = this.workshopService.workshops.find(w => w.id === Number(this.id()));
      this.workshopDetail.set(found);
    }
  }

  get detail() {
    return this.workshopDetail;
  }

  toggleStatus() {
    const workshop = this.detail();
    if (workshop) {
      this.workshopService.toggleWorkshopStatus(workshop.id);
    }
  }
}
