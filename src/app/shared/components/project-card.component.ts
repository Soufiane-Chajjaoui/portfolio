import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project } from '../../core/models/project.model';
import { TranslatePipe } from '../pipes/translate.pipe';
import { BadgeComponent } from './badge.component';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, BadgeComponent, CardComponent],
  template: `
    <app-card class="overflow-hidden flex flex-col h-full">
      <div class="relative overflow-hidden bg-slate-100 dark:bg-slate-700 aspect-square group">
        <!-- Carousel Slides -->
        <ng-container *ngFor="let media of project.media; let i = index">
          <div *ngIf="currentSlide() === i" class="absolute inset-0 w-full h-full">
            <img
              *ngIf="media.type === 'image'"
              [src]="media.src"
              [alt]="media.alt | translate"
              class="w-full h-full object-cover transition-transform duration-300"
              loading="lazy"
            />
            <video
              *ngIf="media.type === 'video'"
              [src]="media.src"
              class="w-full h-full object-cover"
              muted
            ></video>
          </div>
        </ng-container>

        <!-- Navigation Arrows (if multiple images) -->
        <ng-container *ngIf="project.media && project.media.length > 1">
          <button (click)="prevSlide($event)"
                  class="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button (click)="nextSlide($event)"
                  class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <!-- Dots Indicator -->
          <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            <button *ngFor="let _ of project.media; let i = index"
                    (click)="goToSlide(i, $event)"
                    class="w-2 h-2 rounded-full transition-all"
                    [class.bg-white]="currentSlide() === i"
                    [class.bg-white/50]="currentSlide() !== i">
            </button>
          </div>
        </ng-container>
      </div>

      <div class="flex-1 flex flex-col p-6 gap-4">
        <div>
          <h3 class="text-xl font-bold mb-2 dark:text-white">{{ project.title | translate }}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">
            <strong>{{ project.role | translate }}</strong> • {{ project.period | translate }}
          </p>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            {{ project.subject | translate }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2 mt-auto">
          <app-badge
            *ngFor="let tech of project.technologies"
            variant="primary"
          >
            {{ tech }}
          </app-badge>
        </div>

        <a
          [routerLink]="['/portfolio', project.slug]"
          class="inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold text-sm transition-colors"
        >
          {{ 'portfolio.viewProject' | translate }} →
        </a>
      </div>
    </app-card>
  `
})
export class ProjectCardComponent {
  @Input() project!: Project;
  currentSlide = signal(0);

  nextSlide(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.project.media) {
      this.currentSlide.update(curr => (curr + 1) % this.project.media.length);
    }
  }

  prevSlide(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.project.media) {
      this.currentSlide.update(curr => (curr - 1 + this.project.media.length) % this.project.media.length);
    }
  }

  goToSlide(index: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.currentSlide.set(index);
  }
}
