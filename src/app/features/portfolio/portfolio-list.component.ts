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
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  `
})
export class PortfolioListComponent implements OnInit {
  private dataService = inject(DataService);
  projects = signal<any[]>([]);

  ngOnInit() {
    console.log('Loading projects...');
    this.dataService.getProjects().subscribe({
      next: (data) => {
        console.log('Projects received:', data);
        this.projects.set(data);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }
}
