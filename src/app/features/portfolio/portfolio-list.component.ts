import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { CardComponent } from '../../shared/components/card.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { signal } from '@angular/core';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [CommonModule, CardComponent, TranslatePipe],
  template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-12 text-center dark:text-white">{{ 'portfolio.title' | translate }}</h1>
      
      <!-- Loading State -->
      <div *ngIf="loading()" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>

      <!-- Error State -->
      <div *ngIf="error()" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ error() }}</span>
      </div>

      <!-- Projects Grid -->
      <div *ngIf="!loading() && !error()" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <app-card
          *ngFor="let project of projects()"
          [title]="project.title | translate"
          [description]="project.subject | translate"
          [tags]="project.technologies"
          [link]="['/portfolio', project.slug]"
          [linkText]="'portfolio.viewProject' | translate"
          [image]="project.media.length > 0 ? project.media[0].src : ''"
          aspectRatio="square"
        />
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading() && !error() && projects().length === 0" class="text-center py-12">
        <p class="text-xl text-gray-600 dark:text-gray-400">{{ 'portfolio.noProjects' | translate }}</p>
      </div>
    </div>
  `
})
export class PortfolioListComponent implements OnInit {
  private dataService = inject(DataService);
  projects = signal<any[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    console.log('Loading projects...');
    this.loading.set(true);
    this.error.set(null);

    this.dataService.getProjects().subscribe({
      next: (data) => {
        console.log('Projects received:', data);
        this.projects.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.error.set('Failed to load projects. Please try again later.');
        this.loading.set(false);
      }
    });
  }
}
