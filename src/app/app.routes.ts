import { Routes } from '@angular/router';
import { MainScreen } from './pages/main-screen/main-screen';
import { ModeratorRegistration } from './pages/moderator-registration/moderator-registration';
import { FormularioInscripcionTalleres } from './pages/formulario-inscripcion-talleres/formulario-inscripcion-talleres';
import { WorkshopDetailComponent } from './pages/WorkshopDetail/WorkshopDetail.component';
import { WorkshopDetailsListComponent } from './pages/ListWorkshopDetail/WorkshopDetailsList.component';

export const routes: Routes = [
  { path: '', component: MainScreen },
  { path: 'registro-moderador', component: ModeratorRegistration },
  { path: 'registro-colaborador', component: FormularioInscripcionTalleres },
  { path: 'taller/:id', component: WorkshopDetailComponent },
  { path: 'talleres', component: WorkshopDetailsListComponent },
  { path: '**', redirectTo: '' }
];
