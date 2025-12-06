import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { CardComponent } from '../../shared/components/card.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
    selector: 'app-blog-list',
    standalone: true,
    imports: [CommonModule, CardComponent, TranslatePipe],
    template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-12 text-center dark:text-white">{{ 'blog.title' | translate }}</h1>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <app-card
          *ngFor="let post of posts$ | async"
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
    posts$ = this.dataService.getBlogPosts();
}
