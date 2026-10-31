import { Routes } from '@angular/router';
import { PlaceHolder } from './pages/place-holder/place-holder';

export const routes: Routes = [
  { path: '', component: PlaceHolder },
  { path: '**', redirectTo: '' },
];
