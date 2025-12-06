import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { SkeletonCardComponent } from '../../shared/components/skeleton-card.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, CardComponent, SkeletonCardComponent],
  template: `
    <div class="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center" data-aos="fade-down">
          {{ 'projects.title' | translate }}
        </h1>
      
      <!-- Loading State (Skeleton) -->
      <div *ngIf="loading()" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <app-skeleton-card *ngFor="let i of [1,2,3,4,5,6]" aspectRatio="square"></app-skeleton-card>
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
          [link]="['/projects', project.slug]"
          [linkText]="'projects.viewProject' | translate"
          [image]="project.media.length > 0 ? project.media[0].src : ''"
          aspectRatio="square"
        />
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading() && !error() && projects().length === 0" class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400 text-lg mb-8">
            {{ 'projects.noProjects' | translate }}
          </p></div>
    </div>
  `
})
export class ProjectListComponent implements OnInit {
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
