import { Component, Input, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { I18nService } from '../../core/services/i18n.service';
import { Project } from '../../core/models/data.models';
import { RouterLink } from '@angular/router';

import { SkeletonDetailComponent } from '../../shared/components/skeleton-detail.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink, SkeletonDetailComponent],
  template: `
    <!-- Loading State -->
    <app-skeleton-detail *ngIf="loading(); else content"></app-skeleton-detail>

    <ng-template #content>
      <div class="container mx-auto px-4 py-12 max-w-4xl" *ngIf="project(); else notFound">
        <!-- ... existing content ... -->
      </div>
    </ng-template>

    <ng-template #notFound>
      <div class="container mx-auto px-4 py-20 text-center">
        <h2 class="text-3xl font-bold mb-4 dark:text-white">Project Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">The project you are looking for does not exist.</p>
        <a routerLink="/projects" class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Back to Projects
        </a>
      </div>
    </ng-template>

    <!-- Lightbox Modal -->
    <div *ngIf="lightboxOpen()"
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
         (click)="closeLightbox()">

      <!-- Close Button -->
      <button (click)="closeLightbox()"
              class="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Image -->
      <img [src]="lightboxImage()"
           class="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
           (click)="$event.stopPropagation()">
    </div>
  `
})
export class ProjectDetailComponent {
  dataService = inject(DataService);
  i18nService = inject(I18nService);
  project = signal<Project | undefined>(undefined);
  currentSlide = signal<number>(0);
  lightboxOpen = signal<boolean>(false);
  lightboxImage = signal<string>('');

  hasMultipleSlides = computed(() => {
    const media = this.project()?.media;
    return media && media.length > 1;
  });

  openLightbox(src: string) {
    this.lightboxImage.set(src);
    this.lightboxOpen.set(true);
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
  }

  loading = signal<boolean>(true);

  @Input()
  set slug(value: string) {
    console.log('ProjectDetailComponent: slug setter called with:', value);
    this.loading.set(true);
    this.dataService.getProjects().subscribe({
      next: (projects) => {
        console.log('ProjectDetailComponent: projects received:', projects);
        const found = projects.find(p => p.slug === value);
        console.log('ProjectDetailComponent: found project:', found);
        this.project.set(found);
        this.loading.set(false);
        if (found) {
          this.currentSlide.set(0);
        }
      },
      error: (err) => {
        console.error('ProjectDetailComponent: Error loading project:', err);
        this.loading.set(false);
      }
    });
  }

  getProjectTasks(): string[] {
    const tasks = this.project()?.tasks;
    if (!tasks) return [];
    const lang = this.i18nService.currentLang();
    return (tasks as any)[lang] || (tasks as any)['fr'] || [];
  }

  nextSlide() {
    const media = this.project()?.media;
    if (media) {
      this.currentSlide.update(curr => (curr + 1) % media.length);
    }
  }

  prevSlide() {
    const media = this.project()?.media;
    if (media) {
      this.currentSlide.update(curr => (curr - 1 + media.length) % media.length);
    }
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }
}
