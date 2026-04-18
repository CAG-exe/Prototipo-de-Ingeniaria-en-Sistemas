import { Routes } from '@angular/router';
import { MainScreen } from './pages/main-screen/main-screen';
import { ModeratorRegistration } from './pages/moderator-registration/moderator-registration';
import { FormularioInscripcionTalleres } from './pages/formulario-inscripcion-talleres/formulario-inscripcion-talleres';
import { WorkshopDetailComponent } from './pages/WorkshopDetail/WorkshopDetail.component';
import { WorkshopDetailsListComponent } from './pages/ListWorkshopDetail/WorkshopDetailsList.component';

export const routes: Routes = [
  { path: '', component: MainScreen },
  { path: 'login-moderator', component: ModeratorRegistration },
  { path: 'form-inscription-workshops', component: FormularioInscripcionTalleres },
  // { path: 'workshop/:id', component: WorkshopDetailComponent },
  { path: 'workshops-manager', component: WorkshopDetailsListComponent },
  { path: '**', redirectTo: '' }
];
