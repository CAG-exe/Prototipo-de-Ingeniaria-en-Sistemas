import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITallerCultural } from '../../Domain/Interfaces/ITallerCultural';
import { SafePipe } from '../../Shared/Pipes/safe.pipe';

@Component({
  standalone: true,
  selector: 'app-workshop-detail',
  templateUrl: './WorkshopDetail.component.html',
  styleUrls: ['./WorkshopDetail.component.css'],
  imports: [CommonModule, SafePipe],
})
export class WorkshopDetailComponent implements OnInit {
  readonly detail = input<ITallerCultural>();

  constructor() {}

  ngOnInit() {}
}
