import { Routes } from '@angular/router';
import { MainScreen } from './pages/main-screen/main-screen';
import { ModeratorRegistration } from './pages/moderator-registration/moderator-registration';
import { CollaboratorRegistration } from './pages/collaborator-registration/collaborator-registration';
import { FormularioInscripcionTalleres } from './pages/formulario-inscripcion-talleres/formulario-inscripcion-talleres';

export const routes: Routes = [
  { path: '', component: MainScreen },
  { path: 'registro-moderador', component: ModeratorRegistration },
  { path: 'registro-colaborador', component: CollaboratorRegistration },
  { path: 'formulario-inscripcion-talleres', component: FormularioInscripcionTalleres },
  { path: '**', redirectTo: '' }
];
