import { Routes } from '@angular/router';
import { MainScreen } from './pages/main-screen/main-screen';
import { ModeratorRegistration } from './pages/moderator-registration/moderator-registration';
import { FormularioInscripcionTalleres } from './pages/formulario-inscripcion-talleres/formulario-inscripcion-talleres';
import { WorkshopDetailComponent } from './pages/WorkshopDetail/WorkshopDetail.component';
import { WorkshopDetailsListComponent } from './pages/ListWorkshopDetail/WorkshopDetailsList.component';
import { CollaboratorRegistrationComponent } from './pages/collaborator-registration/collaborator-registration.component';
import { UserManagementComponent } from './pages/UserManagement/UserManagement.component';
import { CollaboratorLogin } from './pages/collaborator-login/collaborator-login';

export const routes: Routes = [
  { path: '', component: MainScreen },
  { path: 'login-moderator', component: ModeratorRegistration },
  { path: 'login-collaborator', component: CollaboratorLogin },
  { path: 'register-collaborator', component: CollaboratorRegistrationComponent},
  { path: 'form-inscription-workshops', component: FormularioInscripcionTalleres },
  // { path: 'workshop/:id', component: WorkshopDetailComponent },
  { path: 'workshops-manager', component: WorkshopDetailsListComponent },
  { path: 'users-manager', component: UserManagementComponent },
  { path: '**', redirectTo: '' }
];
