import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly whatsappUrl = `https://wa.me/${environment.contactPhone.replace(/\D/g, '')}`;
  readonly loading = signal(true);
  readonly leaving = signal(false);

  ngOnInit(): void {
    const minimumTime = new Promise<void>((resolve) => window.setTimeout(resolve, 1200));
    const heroImageReady = new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = '/assests/images/header.png';
    });
    const imageWaitLimit = new Promise<void>((resolve) => window.setTimeout(resolve, 2500));

    Promise.all([minimumTime, Promise.race([heroImageReady, imageWaitLimit])]).then(() => {
      this.leaving.set(true);
      window.setTimeout(() => this.loading.set(false), 500);
    });
  }
}
