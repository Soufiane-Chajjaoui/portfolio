import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { CardComponent } from '../../shared/components/card.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { SkeletonCardComponent } from '../../shared/components/skeleton-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, startWith } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, CardComponent, TranslatePipe, SkeletonCardComponent],
  template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-12 text-center dark:text-white">{{ 'blog.title' | translate }}</h1>

      <!-- Loading State -->
      <div *ngIf="loading()" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <app-skeleton-card *ngFor="let i of [1,2,3,4,5,6]" aspectRatio="video"></app-skeleton-card>
      </div>

      <div *ngIf="!loading()" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <app-card
          *ngFor="let post of posts()"
          [title]="post.title | translate"
          [description]="post.description | translate"
          [tags]="post.tags"
          [link]="['/blog', post.slug]"
          [linkText]="'blog.readArticle' | translate"
          [image]="post.coverImage"
        />
      </div>
    </div>
  `
})
export class BlogListComponent {
  dataService = inject(DataService);
  loading = signal(true);

  // Using toSignal to handle the observable and update loading state
  posts = toSignal(
    this.dataService.getBlogPosts().pipe(
      map(posts => {
        this.loading.set(false);
        return posts;
      }),
      catchError(() => {
        this.loading.set(false);
        return of([]);
      })
    ),
    { initialValue: [] }
  );
}
