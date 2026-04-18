import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITallerCultural } from '../Interfaces/ITallerCultural';
import { data } from '../../Data/workshops';


@Injectable({
  providedIn: 'root'
})
export class TallerService {

  private workshopsSubject = new BehaviorSubject<ITallerCultural[]>(data);
  workshops$ = this.workshopsSubject.asObservable();

  constructor() {}

  get workshops(): ITallerCultural[] {
    console.log(this.workshopsSubject.value);
    return this.workshopsSubject.value;
  }

  setWorkshops(workshops: ITallerCultural[]) {
    this.workshopsSubject.next(workshops);
  }

  addWorkshop(workshop: ITallerCultural) {
    const actuales = this.workshopsSubject.value;
    this.workshopsSubject.next([...actuales, workshop]);
  }

  toggleWorkshopStatus(id: number) {
    const actuales = this.workshopsSubject.value;
    const actualizados = actuales.map(w => 
      w.id === id ? { ...w, habilitado: !w.habilitado } : w
    );
    this.workshopsSubject.next(actualizados);
  }
}
