import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

import { SkeletonSkillsComponent } from '../../shared/components/skeleton-skills.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslatePipe, SkeletonSkillsComponent],
  template: `
    <div class="container-custom py-16">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold text-center mb-12 dark:text-white">{{ 'skills.title' | translate }}</h1>

        <!-- Loading state -->
        <app-skeleton-skills *ngIf="loading()"></app-skeleton-skills>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" *ngIf="skillsData()">
          <!-- Frontend -->
          <div class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 class="text-xl font-bold mb-4 text-primary-500">
              {{ skillsData().frontend.title | translate }}
            </h3>
            <div class="space-y-3">
              <div *ngFor="let tech of skillsData().frontend.technologies" class="flex justify-between items-center">
                <span class="font-medium dark:text-white">{{ tech.name }}</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full bg-primary-500 rounded-full transition-all duration-500"
                         [style.width.%]="tech.level">
                    </div>
                  </div>
                  <span class="text-sm text-slate-500">{{ tech.level }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Backend -->
          <div class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 class="text-xl font-bold mb-4 text-primary-500">
              {{ skillsData().backend.title | translate }}
            </h3>
            <div class="space-y-3">
              <div *ngFor="let tech of skillsData().backend.technologies" class="flex justify-between items-center">
                <span class="font-medium dark:text-white">{{ tech.name }}</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full bg-primary-500 rounded-full transition-all duration-500"
                         [style.width.%]="tech.level">
                    </div>
                  </div>
                  <span class="text-sm text-slate-500">{{ tech.level }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tools -->
          <div class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 class="text-xl font-bold mb-4 text-primary-500">
              {{ skillsData().tools.title | translate }}
            </h3>
            <div class="space-y-3">
              <div *ngFor="let tech of skillsData().tools.technologies" class="flex justify-between items-center">
                <span class="font-medium dark:text-white">{{ tech.name }}</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full bg-primary-500 rounded-full transition-all duration-500"
                         [style.width.%]="tech.level">
                    </div>
                  </div>
                  <span class="text-sm text-slate-500">{{ tech.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SkillsComponent implements OnInit {
  private dataService = inject(DataService);
  private platformId = inject(PLATFORM_ID);

  skillsData = signal<any>(null);
  loading = signal(true);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.dataService.getSkills().subscribe({
        next: (data) => {
          this.skillsData.set(data?.skills || null);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading skills:', err);
          this.loading.set(false);
        }
      });
    }
  }
}
