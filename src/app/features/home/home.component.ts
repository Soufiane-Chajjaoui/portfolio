import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslatePipe, CommonModule],
  template: `
    <section class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>

      <div class="container mx-auto max-w-6xl relative z-10">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1 space-y-8 text-center md:text-left">
            <h1 class="text-5xl md:text-7xl font-bold leading-tight">
              <span class="block text-gray-900 dark:text-white mb-2">{{ 'home.greeting' | translate }}</span>
              <span class="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                {{ 'home.role' | translate }}
              </span>
            </h1>
            
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              {{ 'home.description' | translate }}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4 flex-wrap">
              <a routerLink="/projects" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transform hover:-translate-y-1">
                {{ 'home.viewWork' | translate }}
              </a>
              <a routerLink="/blog" class="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 text-gray-900 dark:text-white rounded-full font-bold text-lg transition-all hover:shadow-lg transform hover:-translate-y-1">
                {{ 'home.readBlog' | translate }}
              </a>
              <a href="/assets/documents/cv-soufiane.pdf" download="cv-soufiane.pdf" target="_blank" class="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transform hover:-translate-y-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ 'home.downloadCV' | translate }}
              </a>
            </div>
          </div>
          
          <div class="flex-1 w-full max-w-lg md:max-w-none flex flex-col gap-8">
            <div class="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div class="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre class="font-mono text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
<code><span class="text-indigo-600 dark:text-indigo-400">const</span> engineer = {{ '{' }}
  name: <span class="text-cyan-600 dark:text-cyan-400">'Soufiane'</span>,
  role: <span class="text-cyan-600 dark:text-cyan-400">'Data Engineer'</span>,
  stack: [
    <span class="text-cyan-600 dark:text-cyan-400">'Spring Boot'</span>,
    <span class="text-cyan-600 dark:text-cyan-400">'Angular'</span>
    <span class="text-cyan-600 dark:text-cyan-400">'Apache Spark'</span>,
    <span class="text-cyan-600 dark:text-cyan-400">'Apache Hadoop'</span>,
    <span class="text-cyan-600 dark:text-cyan-400">'Apache Iceberg'</span>,
  ],
  available: <span class="text-indigo-600 dark:text-indigo-400">true</span>
{{ '}' }};</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-bold mb-12 text-center dark:text-white">{{ 'about.title' | translate }}</h2>

        <div *ngIf="personal()" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img [src]="personal().images.profile"
                 [alt]="personal().name.full"
                 class="w-full max-w-md mx-auto rounded-2xl shadow-lg">
          </div>

          <div class="space-y-6">
            <h3 class="text-2xl font-bold dark:text-white">{{ personal().name.full }}</h3>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              {{ personal().title | translate }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ personal().description | translate }}
            </p>

            <div class="space-y-2 dark:text-gray-300">
              <p><strong>Email:</strong> {{ personal().contact.email }}</p>
              <p><strong>{{ 'about.location' | translate }}:</strong> {{ personal().contact.location | translate }}</p>
            </div>

            <!-- Languages -->
            <div *ngIf="personal().languages?.length">
              <h4 class="font-bold text-gray-900 dark:text-white mb-3">{{ 'about.languages' | translate }}</h4>
              <div class="flex flex-wrap gap-3">
                <div *ngFor="let lang of personal().languages"
                     class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <span class="font-medium dark:text-white">{{ lang.name }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">({{ lang.level | translate }})</span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-4">
              <a [href]="personal().contact.linkedin" target="_blank"
                 class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                LinkedIn
              </a>
              <a [href]="personal().contact.github" target="_blank"
                 class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                GitHub
              </a>
              <a [href]="personal().contact.medium" target="_blank"
                 class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Medium
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div class="container mx-auto px-4 max-w-6xl">
        <h2 class="text-3xl font-bold mb-12 text-center dark:text-white">{{ 'skills.title' | translate }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" *ngIf="skillsData()">
          <div *ngFor="let category of getSkillCategories()"
               class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {{ category.title | translate }}
              </h3>
            </div>
            <div class="space-y-3">
              <div *ngFor="let tech of category.technologies" class="flex justify-between items-center">
                <span class="font-medium dark:text-white text-sm">{{ tech.name }}</span>
                <div class="flex items-center gap-2">
                  <div class="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                         [style.width.%]="tech.level">
                    </div>
                  </div>
                  <span class="text-xs text-gray-500 w-8">{{ tech.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-bold mb-12 text-center dark:text-white">{{ 'education.title' | translate }}</h2>

        <div class="space-y-8">
          <!-- Item 1 -->
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow">
            <div class="flex-shrink-0">
              <img src="assets/images/uiz.png" alt="UCA" class="w-16 h-16 object-contain rounded-lg">
            </div>
            <div class="flex-1">
              <div class="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ 'education.items.0.degree' | translate }}</h3>
                <span class="text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full text-sm w-fit mt-2 md:mt-0">
                  {{ 'education.items.0.year' | translate }}
                </span>
              </div>

              <div class="mb-4">
                <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ 'education.items.0.university' | translate }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ 'education.items.0.location' | translate }}</p>
              </div>

              <div class="mb-4">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">{{ 'education.items.0.specialization' | translate }}</span>
                <span class="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                  {{ 'education.items.0.grade' | translate }}
                </span>
              </div>

              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ 'education.items.0.description' | translate }}
              </p>

              <!-- Courses -->
              <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  {{ 'education.items.0.courses.0' | translate }}
                </span>
                <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  {{ 'education.items.0.courses.1' | translate }}
                </span>
                <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  {{ 'education.items.0.courses.2' | translate }}
                </span>
                 <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  {{ 'education.items.0.courses.3' | translate }}
                </span>
              </div>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow">
            <div class="flex-shrink-0">
              <img src="assets/images/uca.png" alt="UIZ" class="w-16 h-16 object-contain rounded-lg">
            </div>
            <div class="flex-1">
              <div class="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ 'education.items.1.degree' | translate }}</h3>
                <span class="text-cyan-600 dark:text-cyan-400 font-medium bg-cyan-50 dark:bg-cyan-900/20 px-3 py-1 rounded-full text-sm w-fit mt-2 md:mt-0">
                  {{ 'education.items.1.year' | translate }}
                </span>
              </div>

              <div class="mb-4">
                <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ 'education.items.1.university' | translate }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ 'education.items.1.location' | translate }}</p>
              </div>

              <div class="mb-4">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">{{ 'education.items.1.specialization' | translate }}</span>
                <span class="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                  {{ 'education.items.1.grade' | translate }}
                </span>
              </div>

              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ 'education.items.1.description' | translate }}
              </p>

              <!-- Courses -->
              <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  {{ 'education.items.1.courses.0' | translate }}
                </span>
                <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  {{ 'education.items.1.courses.1' | translate }}
                </span>
                <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  {{ 'education.items.1.courses.2' | translate }}
                </span>
                 <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  {{ 'education.items.1.courses.3' | translate }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  private dataService = inject(DataService);
  private platformId = inject(PLATFORM_ID);

  personal = signal<any>(null);
  skillsData = signal<any>(null);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.dataService.getPersonalInfo().subscribe({
        next: (data) => this.personal.set(data?.personal || null),
        error: (err) => console.error('Error loading personal info:', err)
      });

      this.dataService.getSkills().subscribe({
        next: (data) => this.skillsData.set(data?.skills || null),
        error: (err) => console.error('Error loading skills:', err)
      });
    }
  }

  getSkillCategories(): any[] {
    const skills = this.skillsData();
    if (!skills) return [];
    return Object.keys(skills).map(key => ({
      key,
      ...skills[key]
    }));
  }
}
