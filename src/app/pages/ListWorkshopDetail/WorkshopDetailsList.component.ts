import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ITallerCultural } from '../../Domain/Interfaces/ITallerCultural';
import { WorkshopDetailComponent } from '../WorkshopDetail/WorkshopDetail.component';
import { TallerService } from '../../Domain/Services/TallerServices';

@Component({
  standalone: true,
  selector: 'app-workshop-details-list',
  templateUrl: './WorkshopDetailsList.component.html',
  imports: [CommonModule, WorkshopDetailComponent],
})
export class WorkshopDetailsListComponent {
  workshops: ITallerCultural[] = [];

  constructor(private workshopService: TallerService) {}

  ngOnInit() {
    this.workshopService.workshops$.subscribe((workshop) => {
      this.workshops = workshop;
    });
  }
}
