import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      <!-- Image Skeleton -->
      <div [class]="'bg-gray-200 dark:bg-gray-700 animate-pulse ' + (aspectRatio === 'square' ? 'aspect-square' : 'aspect-video')"></div>
      
      <div class="p-6 flex-1 flex flex-col">
        <!-- Title Skeleton -->
        <div class="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
        
        <!-- Description Skeleton -->
        <div class="space-y-2 mb-6 flex-1">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
        </div>
        
        <!-- Tags Skeleton -->
        <div class="flex flex-wrap gap-2 mb-6">
          <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div class="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
        
        <!-- Link Skeleton -->
        <div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-auto animate-pulse"></div>
      </div>
    </div>
  `
})
export class SkeletonCardComponent {
    @Input() aspectRatio: 'square' | 'video' = 'video';
}
