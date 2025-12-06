import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group h-full flex flex-col">
      <div [class]="'bg-gray-200 dark:bg-gray-700 relative overflow-hidden ' + (aspectRatio === 'square' ? 'aspect-square' : 'aspect-video')">
        <img *ngIf="image" [src]="image" [alt]="title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <div *ngIf="!image" class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 group-hover:scale-105 transition-transform duration-500"></div>
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ title }}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-3">{{ description }}</p>
        
        <div *ngIf="tags && tags.length" class="flex flex-wrap gap-2 mb-4">
          <span *ngFor="let tag of tags" class="px-3 py-1 text-xs rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
            {{ tag }}
          </span>
        </div>
        
        <a [routerLink]="link" class="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline mt-auto">
          {{ linkText }} 
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
      </div>
    </div>
  `
})
export class CardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() image = '';
  @Input() tags: string[] = [];
  @Input() link: string | any[] = '#';
  @Input() linkText = 'Read More';
  @Input() aspectRatio: 'square' | 'video' = 'video';
}
