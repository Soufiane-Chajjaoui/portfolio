import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <footer class="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400 mt-20">
      <div class="container-custom py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Portfolio</h3>
            <p class="text-sm">{{ 'footer.description' | translate }}</p>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">{{ 'footer.links' | translate }}</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#portfolio" class="hover:text-primary-400 transition-colors">{{ 'nav.portfolio' | translate }}</a></li>
              <li><a href="#blog" class="hover:text-primary-400 transition-colors">{{ 'nav.blog' | translate }}</a></li>
              <li><a href="#contact" class="hover:text-primary-400 transition-colors">{{ 'nav.contact' | translate }}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">{{ 'footer.social' | translate }}</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="https://github.com" target="_blank" class="hover:text-primary-400 transition-colors">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" class="hover:text-primary-400 transition-colors">LinkedIn</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">{{ 'footer.contact' | translate }}</h4>
            <p class="text-sm">
              <a href="mailto:hello@example.com" class="hover:text-primary-400 transition-colors">
                hello@example.com
              </a>
            </p>
          </div>
        </div>

        <div class="border-t border-slate-700 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; 2024 Portfolio. {{ 'footer.rights' | translate }}</p>
            <p>{{ 'footer.builtwith' | translate }}</p>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
