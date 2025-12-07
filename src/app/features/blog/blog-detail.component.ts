import { Component, Input, inject, signal, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { BlogPost } from '../../core/models/data.models';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { SkeletonDetailComponent } from '../../shared/components/skeleton-detail.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink, SkeletonDetailComponent],
  template: `
    <!-- Loading State -->
    <app-skeleton-detail *ngIf="loading(); else postContent"></app-skeleton-detail>

    <ng-template #postContent>
      <div class="container mx-auto px-4 py-12 max-w-3xl" *ngIf="post(); let blogPost; else notFound">
        <!-- Back Link -->
        <a routerLink="/blog" class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-8 hover:underline">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </a>

        <!-- Article Header -->
        <article class="prose prose-lg dark:prose-invert max-w-none">
          <header class="mb-8">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 dark:text-white">{{ blogPost.title | translate }}</h1>
            <div class="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <time class="flex items-center gap-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ blogPost.date }}
              </time>
            </div>
          </header>

          <!-- Article Content -->
          <div [innerHTML]="content()" class="text-gray-700 dark:text-gray-300 leading-relaxed"></div>
        </article>
      </div>
    </ng-template>

    <ng-template #notFound>
      <div class="container mx-auto px-4 py-20 text-center">
        <h2 class="text-3xl font-bold mb-4 dark:text-white">Article Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">The article you are looking for does not exist.</p>
        <a routerLink="/blog" class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Back to Blog
        </a>
      </div>
    </ng-template>
  `
})
export class BlogDetailComponent {
  dataService = inject(DataService);
  sanitizer = inject(DomSanitizer);

  post = signal<BlogPost | undefined>(undefined);
  content = signal<SafeHtml>('');

  loading = signal<boolean>(true);

  @Input()
  set slug(value: string) {
    this.loading.set(true);
    this.dataService.getBlogPosts().subscribe({
      next: (posts) => {
        const foundPost = posts.find(p => p.slug === value);
        this.post.set(foundPost);

        if (foundPost && foundPost.htmlFile) {
          this.dataService.getBlogPostHtml(foundPost.htmlFile).subscribe({
            next: (html) => {
              this.content.set(this.sanitizer.bypassSecurityTrustHtml(html));
              this.loading.set(false);
            },
            error: () => {
              this.loading.set(false);
            }
          });
        } else {
          this.loading.set(false);
        }
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
