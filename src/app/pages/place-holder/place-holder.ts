import { Component } from '@angular/core';
import { StartProjectModal } from '../../shared/start-project-modal/start-project-modal';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-place-holder',
  imports: [StartProjectModal],
  templateUrl: './place-holder.html',
  styleUrl: './place-holder.css',
})
export class PlaceHolder {
  projectModalOpen = false;
  readonly contactPhone = environment.contactPhone;
}
