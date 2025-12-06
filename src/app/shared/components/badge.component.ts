import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'outline';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="getClasses()">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';

  getClasses(): string {
    const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';

    const variantClasses = {
      primary: 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200',
      secondary: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200',
      accent: 'bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200',
      outline: 'border border-primary-500 text-primary-500 dark:border-primary-400 dark:text-primary-400'
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }
}
