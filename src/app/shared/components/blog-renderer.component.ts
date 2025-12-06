import { Component, Input, ViewChild, ElementRef, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-blog-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prose dark:prose-dark max-w-3xl mx-auto py-8">
      <div #blogContent class="blog-content"></div>
    </div>
  `,
  styles: [`
    :host ::ng-deep .blog-content {
      @apply prose dark:prose-dark max-w-none;
    }

    :host ::ng-deep .blog-content h1 {
      @apply text-4xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100;
    }

    :host ::ng-deep .blog-content h2 {
      @apply text-3xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100;
    }

    :host ::ng-deep .blog-content h3 {
      @apply text-2xl font-bold mt-6 mb-3 text-slate-900 dark:text-slate-100;
    }

    :host ::ng-deep .blog-content p {
      @apply mb-4 text-slate-700 dark:text-slate-300 leading-relaxed;
    }

    :host ::ng-deep .blog-content ul {
      @apply list-disc list-inside mb-4 text-slate-700 dark:text-slate-300;
    }

    :host ::ng-deep .blog-content ol {
      @apply list-decimal list-inside mb-4 text-slate-700 dark:text-slate-300;
    }

    :host ::ng-deep .blog-content li {
      @apply mb-2;
    }

    :host ::ng-deep .blog-content code {
      @apply bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm font-mono text-slate-900 dark:text-slate-100;
    }

    :host ::ng-deep .blog-content pre {
      @apply bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4;
    }

    :host ::ng-deep .blog-content pre code {
      @apply bg-transparent p-0 text-inherit;
    }

    :host ::ng-deep .blog-content blockquote {
      @apply border-l-4 border-primary-500 pl-4 italic my-4 text-slate-600 dark:text-slate-400;
    }

    :host ::ng-deep .blog-content img {
      @apply max-w-full h-auto rounded-lg my-6 shadow-lg;
    }

    :host ::ng-deep .blog-content a {
      @apply text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 underline;
    }

    :host ::ng-deep .blog-content table {
      @apply w-full border-collapse my-4;
    }

    :host ::ng-deep .blog-content th,
    :host ::ng-deep .blog-content td {
      @apply border border-slate-300 dark:border-slate-600 px-4 py-2;
    }

    :host ::ng-deep .blog-content th {
      @apply bg-slate-100 dark:bg-slate-800 font-semibold;
    }
  `]
})
export class BlogRendererComponent implements OnInit {
  @Input() htmlFile = '';
  @ViewChild('blogContent') blogContent!: ElementRef;

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.htmlFile) {
      this.loadBlogContent();
    }
  }

  private loadBlogContent(): void {
    this.dataService.getBlogPostContent(this.htmlFile).subscribe({
      next: (content) => {
        this.renderContent(content);
      },
      error: (err) => {
        console.error('Error loading blog content:', err);
        if (this.blogContent) {
          this.blogContent.nativeElement.innerHTML = '<p>Error loading blog content</p>';
        }
      }
    });
  }

  private renderContent(html: string): void {
    if (this.blogContent) {
      const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
      this.blogContent.nativeElement.innerHTML = sanitized;
      this.processCodeBlocks();
    }
  }

  private processCodeBlocks(): void {
    const codeBlocks = this.blogContent.nativeElement.querySelectorAll('pre code');
    codeBlocks.forEach((block: HTMLElement) => {
      block.classList.add('font-mono', 'text-sm');
    });
  }
}
