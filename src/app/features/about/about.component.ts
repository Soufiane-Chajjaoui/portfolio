import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

import { SkeletonAboutComponent } from '../../shared/components/skeleton-about.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslatePipe, SkeletonAboutComponent],
  template: `
    <div class="container-custom py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-center mb-12 dark:text-white">{{ 'about.title' | translate }}</h1>

        <!-- Loading state -->
        <app-skeleton-about *ngIf="loading()"></app-skeleton-about>

        <div *ngIf="personal()" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img [src]="personal().images.profile"
                 [alt]="personal().name.full"
                 class="w-full max-w-md mx-auto rounded-2xl shadow-lg">
          </div>

          <div class="space-y-6">
            <h2 class="text-2xl font-bold dark:text-white">{{ personal().name.full }}</h2>
            <p class="text-lg text-slate-600 dark:text-slate-400">
              {{ personal().title | translate }}
            </p>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
              {{ personal().description | translate }}
            </p>

            <div class="space-y-2 dark:text-slate-300">
              <p><strong>Email:</strong> {{ personal().contact.email }}</p>
              <p><strong>{{ 'about.location' | translate }}:</strong> {{ personal().contact.location | translate }}</p>
            </div>

            <div class="flex flex-wrap gap-4">
              <a [href]="personal().contact.linkedin" target="_blank"
                 class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                LinkedIn
              </a>
              <a [href]="personal().contact.github" target="_blank"
                 class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                GitHub
              </a>
              <a [href]="personal().contact.medium" target="_blank"
                 class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Medium
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent implements OnInit {
  private dataService = inject(DataService);
  private platformId = inject(PLATFORM_ID);

  personal = signal<any>(null);
  loading = signal(true);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.dataService.getPersonalInfo().subscribe({
        next: (data) => {
          this.personal.set(data?.personal || null);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading personal info:', err);
          this.loading.set(false);
        }
      });
    }
  }
}
