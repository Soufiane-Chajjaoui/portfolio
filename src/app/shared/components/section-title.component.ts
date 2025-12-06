import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-12 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        <ng-content></ng-content>
      </h2>
      <div class="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto" *ngIf="showUnderline"></div>
      <p class="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto" *ngIf="subtitle">
        {{ subtitle }}
      </p>
    </div>
  `
})
export class SectionTitleComponent {
  @Input() subtitle: string | null = null;
  @Input() showUnderline = true;
}
