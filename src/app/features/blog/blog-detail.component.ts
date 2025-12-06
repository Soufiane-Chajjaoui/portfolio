import { Component, Input, inject, signal, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { BlogPost } from '../../core/models/data.models';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-blog-detail',
    standalone: true,
    imports: [CommonModule, TranslatePipe, RouterLink],
    template: `
    <div class="container mx-auto px-4 py-12 max-w-3xl" *ngIf="post(); else loading">
      <a routerLink="/blog" class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-8 hover:underline">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {{ 'common.back' | translate }}
      </a>

      <article>
        <header class="mb-10 text-center">
          <div class="flex justify-center gap-2 mb-4">
            <span *ngFor="let tag of post()?.tags" class="px-3 py-1 text-xs rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
              {{ tag }}
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 dark:text-white leading-tight">{{ post()?.title | translate }}</h1>
          <time class="text-gray-500 dark:text-gray-400">{{ post()?.date | date }}</time>
        </header>

        <img *ngIf="post()?.coverImage" [src]="post()?.coverImage" class="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-12">

        <!-- Blog Content Injection -->
        <div class="prose prose-lg dark:prose-invert max-w-none prose-indigo
          prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
          prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-li:text-gray-700 dark:prose-li:text-gray-300
          prose-strong:text-gray-900 dark:prose-strong:text-white
          prose-code:text-indigo-600 dark:prose-code:text-indigo-400
          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
          prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500
          prose-hr:border-gray-300 dark:prose-hr:border-gray-700"
          [innerHTML]="content()"></div>
      </article>
    </div>

    <ng-template #loading>
      <div class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    </ng-template>
  `
})
export class BlogDetailComponent {
    dataService = inject(DataService);
    sanitizer = inject(DomSanitizer);

    post = signal<BlogPost | undefined>(undefined);
    content = signal<SafeHtml>('');

    @Input()
    set slug(value: string) {
        this.dataService.getBlogPosts().subscribe(posts => {
            const foundPost = posts.find(p => p.slug === value);
            this.post.set(foundPost);

            if (foundPost && foundPost.htmlFile) {
                this.dataService.getBlogPostHtml(foundPost.htmlFile).subscribe(html => {
                    // In a real app, you might want to sanitize more strictly or use a library
                    // But for static local files, bypassing security trust is often acceptable if you trust the source
                    this.content.set(this.sanitizer.bypassSecurityTrustHtml(html));
                });
            }
        });
    }
}
