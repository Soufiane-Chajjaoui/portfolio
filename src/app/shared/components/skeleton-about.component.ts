import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton-about',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container-custom py-16 animate-pulse">
      <div class="max-w-4xl mx-auto">
        <!-- Title Skeleton -->
        <div class="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-12"></div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Image Skeleton -->
          <div>
            <div class="w-full max-w-md mx-auto aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          </div>

          <div class="space-y-6">
            <!-- Name Skeleton -->
            <div class="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            
            <!-- Title Skeleton -->
            <div class="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            
            <!-- Description Skeleton -->
            <div class="space-y-3">
              <div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            <!-- Contact Info Skeleton -->
            <div class="space-y-3 pt-4">
              <div class="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            <!-- Social Links Skeleton -->
            <div class="flex flex-wrap gap-4 pt-2">
              <div class="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div class="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div class="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SkeletonAboutComponent { }
