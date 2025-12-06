import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nService } from '../services/i18n.service';
import { ThemeService } from '../services/theme.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <nav class="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="container-custom py-4">
        <div class="flex justify-between items-center">
          <a routerLink="/" class="text-2xl font-bold text-primary-500">
            Portfolio
          </a>

          <div class="hidden md:flex gap-8">
            <a
              routerLink="/portfolio"
              routerLinkActive="text-primary-500 border-b-2 border-primary-500"
              class="text-slate-700 dark:text-slate-300 hover:text-primary-500 transition-colors py-2"
            >
              {{ 'nav.portfolio' | translate }}
            </a>
            <a
              routerLink="/blog"
              routerLinkActive="text-primary-500 border-b-2 border-primary-500"
              class="text-slate-700 dark:text-slate-300 hover:text-primary-500 transition-colors py-2"
            >
              {{ 'nav.blog' | translate }}
            </a>
            <a
              routerLink="/contact"
              routerLinkActive="text-primary-500 border-b-2 border-primary-500"
              class="text-slate-700 dark:text-slate-300 hover:text-primary-500 transition-colors py-2"
            >
              {{ 'nav.contact' | translate }}
            </a>
          </div>

          <div class="flex gap-4 items-center">
            <button
              (click)="toggleLanguage()"
              class="text-sm font-semibold px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {{ currentLanguage === 'en' ? 'FR' : 'EN' }}
            </button>

            <button
              (click)="toggleTheme()"
              class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              [attr.aria-label]="currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
            >
              <span *ngIf="currentTheme === 'light'">🌙</span>
              <span *ngIf="currentTheme === 'dark'">☀️</span>
            </button>

            <button
              (click)="toggleMenu()"
              class="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <span *ngIf="!menuOpen">☰</span>
              <span *ngIf="menuOpen">✕</span>
            </button>
          </div>
        </div>

        <div *ngIf="menuOpen" class="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <a 
            routerLink="/portfolio"
            (click)="menuOpen = false"
            class="block py-2 text-slate-700 dark:text-slate-300 hover:text-primary-500"
          >
            {{ 'nav.portfolio' | translate }}
          </a>
          <a 
            routerLink="/blog"
            (click)="menuOpen = false"
            class="block py-2 text-slate-700 dark:text-slate-300 hover:text-primary-500"
          >
            {{ 'nav.blog' | translate }}
          </a>
          <a 
            routerLink="/contact"
            (click)="menuOpen = false"
            class="block py-2 text-slate-700 dark:text-slate-300 hover:text-primary-500"
          >
            {{ 'nav.contact' | translate }}
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  currentLanguage: 'en' | 'fr' = 'en';
  currentTheme: 'light' | 'dark' = 'light';

  constructor(
    private i18nService: I18nService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
    this.currentTheme = this.themeService.getCurrentTheme();

    this.i18nService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });

    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleLanguage(): void {
    this.i18nService.toggleLanguage();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
