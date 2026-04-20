import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ITallerCultural } from '../../Domain/Interfaces/ITallerCultural';
import { WorkshopDetailComponent } from '../WorkshopDetail/WorkshopDetail.component';
import { TallerService } from '../../Domain/Services/TallerServices';

@Component({
  standalone: true,
  selector: 'app-workshop-details-list',
  templateUrl: './WorkshopDetailsList.component.html',
  imports: [CommonModule, WorkshopDetailComponent, RouterLink],
})
export class WorkshopDetailsListComponent {
  workshops: ITallerCultural[] = [];

  constructor(private workshopService: TallerService) {}

  ngOnInit() {
    this.workshopService.workshops$.subscribe((workshop) => {
      this.workshops = workshop;
    });
  }

  trackById(index: number, item: ITallerCultural) {
  return item.id;
}

}
