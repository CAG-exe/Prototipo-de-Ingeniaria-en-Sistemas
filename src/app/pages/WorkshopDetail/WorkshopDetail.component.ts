import { Component, OnInit, input } from '@angular/core';
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
  readonly detail = input<ITallerCultural>();

  constructor(private workshopService: TallerService) {}

  ngOnInit() {}

  toggleStatus() {
    const workshop = this.detail();
    if (workshop) {
      this.workshopService.toggleWorkshopStatus(workshop.id);
    }
  }
}
