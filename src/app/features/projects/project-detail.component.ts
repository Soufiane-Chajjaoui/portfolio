import { Component, Input, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { I18nService } from '../../core/services/i18n.service';
import { Project } from '../../core/models/data.models';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

import { SkeletonDetailComponent } from '../../shared/components/skeleton-detail.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink, SkeletonDetailComponent],
  template: `
    <!-- Loading State -->
    <app-skeleton-detail *ngIf="loading(); else content"></app-skeleton-detail>

    <ng-template #content>
      <div class="container mx-auto px-4 py-12 max-w-4xl" *ngIf="project(); let p; else notFound">
        <!-- Back Link -->
        <a routerLink="/projects" class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-8 hover:underline">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ 'common.back' | translate }}
        </a>

        <!-- Header -->
        <header class="mb-12 text-center">
          <div class="flex justify-center mb-6" *ngIf="p.company?.logo">
            <img [src]="p.company!.logo" [alt]="p.company!.name | translate" class="h-20 w-auto object-contain">
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 dark:text-white leading-tight">{{ p.title | translate }}</h1>
          <div class="flex flex-wrap justify-center gap-4 text-gray-600 dark:text-gray-400">
            <span class="flex items-center gap-1" *ngIf="p.company">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              {{ p.company.name | translate }}
            </span>
            <span class="hidden md:inline">•</span>
            <span class="flex items-center gap-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {{ p.period | translate }}
            </span>
          </div>
        </header>

        <!-- Gallery / Media -->
        <div class="mb-16 relative group" *ngIf="p.media && p.media.length > 0">
          <div class="relative overflow-hidden rounded-2xl shadow-xl bg-gray-100 dark:bg-gray-800 aspect-video">
            <img [src]="p.media[currentSlide()].src" 
                 [alt]="p.media[currentSlide()].alt | translate"
                 class="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
                 (click)="openLightbox(p.media[currentSlide()].src)">
          </div>
          
          <!-- Navigation Controls -->
          <ng-container *ngIf="hasMultipleSlides()">
            <button (click)="prevSlide()" class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 text-gray-800 dark:text-white shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button (click)="nextSlide()" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 text-gray-800 dark:text-white shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            
            <!-- Indicators -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button *ngFor="let m of p.media; let i = index" 
                      (click)="goToSlide(i)"
                      class="w-2.5 h-2.5 rounded-full transition-all shadow-sm"
                      [ngClass]="{
                        'bg-white scale-125': i === currentSlide(),
                        'bg-white/50': i !== currentSlide()
                      }">
              </button>
            </div>
          </ng-container>
        </div>

        <!-- Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <!-- Description -->
          <div class="space-y-6">
            <h3 class="text-2xl font-bold dark:text-white">{{ 'projects.description' | translate }}</h3>
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ p.description | translate }}
            </p>
            
            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 space-y-4">
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-indigo-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <div>
                  <span class="block text-sm text-gray-500 dark:text-gray-400 font-medium">{{ 'projects.role' | translate }}</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{ p.role | translate }}</span>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-indigo-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                <div>
                  <span class="block text-sm text-gray-500 dark:text-gray-400 font-medium">{{ 'projects.type' | translate }}</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{ p.type | translate }}</span>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-indigo-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <span class="block text-sm text-gray-500 dark:text-gray-400 font-medium">{{ 'projects.subject' | translate }}</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{ p.subject | translate }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Technologies & Tasks -->
          <div class="space-y-8">
            <!-- Technologies -->
            <div *ngIf="p.technologies && p.technologies.length > 0">
              <h3 class="text-2xl font-bold mb-6 dark:text-white">{{ 'projects.technologies' | translate }}</h3>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let tech of p.technologies" 
                      class="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium shadow-sm">
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Tasks -->
            <div *ngIf="getProjectTasks().length > 0">
              <h3 class="text-2xl font-bold mb-6 dark:text-white">{{ 'projects.tasks' | translate }}</h3>
              <ul class="space-y-3">
                <li *ngFor="let task of getProjectTasks()" class="flex gap-3 text-gray-600 dark:text-gray-300">
                  <svg class="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <!-- Links -->
            <div class="flex flex-wrap gap-4 pt-4" *ngIf="p.links">
              <a *ngIf="p.links.github" [href]="p.links.github" target="_blank" class="flex-1 min-w-[140px] inline-flex justify-center items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a *ngIf="p.links.demo" [href]="p.links.demo" target="_blank" class="flex-1 min-w-[140px] inline-flex justify-center items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Live Demo
              </a>
            </div>
          </div>
        </div>
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
export class ProjectDetailComponent implements OnInit {
  dataService = inject(DataService);
  i18nService: I18nService = inject(I18nService);
  route = inject(ActivatedRoute);

  project = signal<Project | undefined>(undefined);
  currentSlide = signal<number>(0);
  lightboxOpen = signal<boolean>(false);
  lightboxImage = signal<string>('');
  loading = signal<boolean>(true);

  hasMultipleSlides = computed(() => {
    const media = this.project()?.media;
    return media && media.length > 1;
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadProject(slug);
      } else {
        this.loading.set(false);
      }
    });
  }

  loadProject(slug: string) {
    this.loading.set(true);
    this.dataService.getProjects().subscribe({
      next: (projects) => {
        const found = projects.find(p => p.slug === slug);
        this.project.set(found);
        this.loading.set(false);
        if (found) {
          this.currentSlide.set(0);
        }
      },
      error: (err: any) => {
        console.error('Error loading project:', err);
        this.loading.set(false);
      }
    });
  }

  openLightbox(src: string) {
    this.lightboxImage.set(src);
    this.lightboxOpen.set(true);
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
  }

  getProjectTasks(): string[] {
    const tasks = this.project()?.tasks;
    if (!tasks) return [];
    const lang = this.i18nService.currentLang();
    return tasks[lang] || tasks['fr'] || [];
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
