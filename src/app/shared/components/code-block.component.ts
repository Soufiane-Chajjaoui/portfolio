import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-block-wrapper">
      <div class="flex justify-between items-center mb-4 px-4 pt-4 pb-2">
        <span class="text-xs text-slate-400 font-mono" *ngIf="language">{{ language }}</span>
        <button 
          (click)="copyCode()"
          class="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
        >
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
      <pre class="code-block"><code #codeBlock [class]="'language-' + language">{{ code }}</code></pre>
    </div>
  `,
  styles: [`
    .code-block-wrapper {
      border-radius: 0.5rem;
      overflow: hidden;
      margin: 1rem 0;
    }

    pre {
      margin: 0;
      padding: 1rem;
      overflow-x: auto;
    }

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.875rem;
      line-height: 1.5;
    }
  `]
})
export class CodeBlockComponent implements AfterViewInit {
  @Input() code = '';
  @Input() language = 'typescript';
  @ViewChild('codeBlock') codeBlock!: ElementRef<HTMLElement>;

  copied = false;

  ngAfterViewInit(): void {
    if (this.codeBlock) {
      hljs.highlightElement(this.codeBlock.nativeElement);
    }
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.code).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }
}
