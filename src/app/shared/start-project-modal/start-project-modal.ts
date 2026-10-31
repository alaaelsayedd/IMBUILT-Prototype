import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectEnquiryService } from '../services/project-enquiry.service';

@Component({
  selector: 'app-start-project-modal',
  imports: [FormsModule],
  templateUrl: './start-project-modal.html',
  styleUrl: './start-project-modal.css',
})
export class StartProjectModal {
  @Output() closed = new EventEmitter<void>();
  private readonly projectEnquiryService = inject(ProjectEnquiryService);

  step = 1;
  direction: 'forward' | 'back' = 'forward';
  selectedNeed = '';
  selectedStage = '';
  name = '';
  business = '';
  email = '';
  phone = '';
  sent = false;
  sending = false;
  submitError = '';

  readonly needs = [
    'New digital product',
    'Improve an existing product',
    'Digitize a workflow',
    'Website or platform',
    'QA & improvement',
    'Not sure yet',
  ];
  readonly stages = [
    'Just an idea',
    'Defined requirements',
    'Design in progress',
    'Development in progress',
    'Existing live product',
  ];

  close(): void {
    this.closed.emit();
  }

  chooseNeed(need: string): void {
    this.selectedNeed = need;
    this.goTo(2);
  }

  chooseStage(stage: string): void {
    this.selectedStage = stage;
    this.goTo(3);
  }

  private goTo(step: number): void {
    this.direction = step > this.step ? 'forward' : 'back';
    this.step = step;
  }

  sendEmail(): void {
    if (this.sending) return;

    this.sending = true;
    this.submitError = '';

    this.projectEnquiryService
      .send({
        name: this.name,
        business: this.business || 'Not provided',
        email: this.email,
        phone: this.phone || 'Not provided',
        need: this.selectedNeed,
        projectStage: this.selectedStage,
      })
      .subscribe({
        next: () => {
          this.sent = true;
        },
        error: () => {
          this.submitError = 'We could not send your enquiry. Please try again.';
          this.sending = false;
        },
        complete: () => {
          this.sending = false;
        },
      });
  }
}
