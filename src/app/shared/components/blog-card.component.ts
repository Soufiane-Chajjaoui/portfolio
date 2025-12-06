import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogPost } from '../../core/models/project.model';
import { TranslatePipe } from '../pipes/translate.pipe';
import { BadgeComponent } from './badge.component';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, BadgeComponent, CardComponent],
  template: `
    <app-card class="flex flex-col h-full overflow-hidden">
      <div class="relative overflow-hidden bg-slate-100 dark:bg-slate-700 h-48">
        <img 
          [src]="post.coverImage"
          [alt]="post.title | translate"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div class="flex-1 flex flex-col p-6 gap-4">
        <div>
          <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
            <span>{{ post.date | date: 'dd MMM yyyy' }}</span>
            <span *ngIf="post.readingTime">• {{ post.readingTime }} min read</span>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ post.title | translate }}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {{ post.description | translate }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <app-badge 
            *ngFor="let tag of post.tags"
            variant="secondary"
          >
            {{ tag }}
          </app-badge>
        </div>

        <a 
          [routerLink]="['/blog', post.slug]"
          class="inline-block text-primary-500 hover:text-primary-600 font-semibold text-sm transition-colors mt-auto"
        >
          {{ 'common.readMore' | translate }} →
        </a>
      </div>
    </app-card>
  `
})
export class BlogCardComponent {
  @Input() post!: BlogPost;
}
