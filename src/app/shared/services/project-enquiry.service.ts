import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ProjectEnquiry {
  name: string;
  business: string;
  email: string;
  phone: string;
  need: string;
  projectStage: string;
}

interface FormSubmitResponse {
  success: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectEnquiryService {
  private readonly http = inject(HttpClient);

  send(enquiry: ProjectEnquiry): Observable<FormSubmitResponse> {
    const { projectStage, ...fields } = enquiry;

    return this.http.post<FormSubmitResponse>(
      `https://formsubmit.co/ajax/${environment.projectEnquiryEmail}`,
      {
        ...fields,
        _replyto: enquiry.email,
        _subject: `New project enquiry from ${enquiry.name}`,
        project_stage: projectStage,
      },
      { headers: { Accept: 'application/json' } },
    );
  }
}
