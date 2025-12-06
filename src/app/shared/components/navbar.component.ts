import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe, CommonModule],
  template: `
    <nav class="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <a routerLink="/" class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
          < Soufiane Chajjaoui />
        </a>
        
        <div class="hidden md:flex items-center space-x-8">
        <div class="hidden md:flex items-center space-x-8">
          <a routerLink="/" routerLinkActive="text-indigo-600 dark:text-indigo-400" [routerLinkActiveOptions]="{exact: true}" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
            {{ 'nav.home' | translate }}
          </a>
          <a routerLink="/projects" routerLinkActive="text-indigo-600 dark:text-indigo-400" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
            {{ 'nav.projects' | translate }}
          </a>
          <a routerLink="/blog" routerLinkActive="text-indigo-600 dark:text-indigo-400" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
            {{ 'nav.blog' | translate }}
          </a>
          <a routerLink="/contact" routerLinkActive="text-indigo-600 dark:text-indigo-400" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
            {{ 'nav.contact' | translate }}
          </a>
        </div>

        <div class="flex items-center gap-4">
          <!-- Lang Toggle -->
          <button (click)="i18n.toggleLanguage()" class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S12 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            {{ i18n.currentLang() === 'en' ? 'FR' : 'EN' }}
          </button>

          <!-- Theme Toggle -->
          <button (click)="theme.toggleTheme()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <!-- Moon icon (for switching to dark mode) -->
            <svg *ngIf="!theme.darkMode()" class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <!-- Sun icon (for switching to light mode) -->
            <svg *ngIf="theme.darkMode()" class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <!-- Mobile Menu Button -->
          <button class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  theme = inject(ThemeService);
  i18n = inject(I18nService);
}
