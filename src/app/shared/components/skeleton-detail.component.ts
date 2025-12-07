import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton-detail',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container mx-auto px-4 py-12 max-w-4xl animate-pulse">
      <!-- Back Link Skeleton -->
      <div class="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>

      <!-- Title Skeleton -->
      <div class="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
      
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div class="md:col-span-2 space-y-6">
          <!-- Media/Carousel Skeleton -->
          <div class="bg-gray-200 dark:bg-gray-700 rounded-xl aspect-square w-full"></div>
        </div>

        <div class="space-y-6">
          <!-- Info Cards Skeleton -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-32">
            <div class="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div class="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-32">
             <div class="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
             <div class="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-32">
             <div class="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
             <div class="flex gap-2">
                <div class="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
             </div>
          </div>
        </div>
      </div>

      <!-- Description Skeleton -->
      <div class="space-y-4 mb-12">
        <div class="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div class="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div class="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  `
})
export class SkeletonDetailComponent { }
