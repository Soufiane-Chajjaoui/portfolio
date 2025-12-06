import { Component, Input, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { I18nService } from '../../core/services/i18n.service';
import { Project } from '../../core/models/data.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12 max-w-4xl" *ngIf="project(); else loading">
      <a routerLink="/portfolio" class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-8 hover:underline">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {{ 'common.back' | translate }}
      </a>

      <h1 class="text-4xl md:text-5xl font-bold mb-6 dark:text-white">{{ project()?.title | translate }}</h1>
      
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div class="md:col-span-2 space-y-6">
          <!-- Carousel -->
          <div class="relative rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-square group">
            
            <!-- Slides -->
            <ng-container *ngFor="let media of project()?.media; let i = index">
              <div *ngIf="currentSlide() === i" class="absolute inset-0 w-full h-full transition-opacity duration-500">
                
                <ng-container [ngSwitch]="media.type">
                  <!-- Image -->
                  <img *ngSwitchCase="'image'"
                       [src]="media.src"
                       class="w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                       [alt]="project()?.title | translate"
                       (click)="openLightbox(media.src)">

                  <!-- Video -->
                  <video *ngSwitchCase="'video'" [src]="media.src" controls class="w-full h-full object-cover"></video>
                </ng-container>

              </div>
            </ng-container>

            <!-- No Media Fallback -->
            <div *ngIf="!project()?.media?.length" class="absolute inset-0 flex items-center justify-center text-gray-400">
              No Media Available
            </div>

            <!-- Controls (only if > 1 slide) -->
            <ng-container *ngIf="hasMultipleSlides()">
              <!-- Prev Button -->
              <button (click)="prevSlide()" class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <!-- Next Button -->
              <button (click)="nextSlide()" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              <!-- Indicators -->
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <button *ngFor="let _ of project()?.media; let i = index"
                        (click)="goToSlide(i)"
                        class="w-3 h-3 rounded-full transition-all border-2 border-white"
                        [class.bg-white]="currentSlide() === i"
                        [class.bg-transparent]="currentSlide() !== i">
                </button>
              </div>

              <!-- Slide Counter -->
              <div class="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {{ currentSlide() + 1 }} / {{ project()?.media?.length }}
              </div>
            </ng-container>

          </div>
        </div>

        <div class="space-y-6">
          <div *ngIf="project()?.type" class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ 'project.type' | translate }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ project()?.type | translate }}</p>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ 'project.role' | translate }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ project()?.role | translate }}</p>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ 'project.period' | translate }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ project()?.period | translate }}</p>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ 'project.tech' | translate }}</h3>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let tech of project()?.technologies" class="px-3 py-1 text-xs rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="prose dark:prose-invert max-w-none mb-12">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">{{ 'project.about' | translate }}</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ project()?.description | translate }}
        </p>
      </div>

      <!-- Tasks -->
      <div *ngIf="project()?.tasks" class="mb-12">
        <h2 class="text-2xl font-bold mb-6 dark:text-white">{{ 'project.tasks' | translate }}</h2>
        <ul class="space-y-3">
          <li *ngFor="let task of getProjectTasks()"
              class="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <span class="text-green-500 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span class="text-gray-700 dark:text-gray-300">{{ task }}</span>
          </li>
        </ul>
      </div>

      <!-- Links -->
      <div *ngIf="project()?.links && (project()?.links?.github || project()?.links?.demo)" class="flex gap-4">
        <a *ngIf="project()?.links?.github"
           [href]="project()?.links?.github"
           target="_blank"
           class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a *ngIf="project()?.links?.demo"
           [href]="project()?.links?.demo"
           target="_blank"
           class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Demo
        </a>
      </div>
    </div>

    <ng-template #loading>
      <div class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
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

  @Input()
  set slug(value: string) {
    this.dataService.getProjects().subscribe(projects => {
      this.project.set(projects.find(p => p.slug === value));
      this.currentSlide.set(0); // Reset slide on project change
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
