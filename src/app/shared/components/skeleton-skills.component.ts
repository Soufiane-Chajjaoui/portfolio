import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton-skills',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container-custom py-16 animate-pulse">
      <div class="max-w-6xl mx-auto">
        <!-- Title Skeleton -->
        <div class="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-12"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Skill Category Card Skeleton (x3) -->
          <div *ngFor="let i of [1,2,3]" class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <!-- Category Title -->
            <div class="h-7 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            
            <!-- Skill Items -->
            <div class="space-y-4">
              <div *ngFor="let j of [1,2,3,4,5]" class="flex justify-between items-center">
                <div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="flex items-center gap-2">
                  <div class="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div class="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SkeletonSkillsComponent { }
