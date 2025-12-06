import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'en' | 'fr';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  currentLang = signal<Language>('en');
  private platformId = inject(PLATFORM_ID);
  private translateService = inject(TranslateService);

  constructor() {
    this.translateService.addLangs(['en', 'fr']);
    this.translateService.setDefaultLang('en');

    let savedLang: Language | null = null;

    if (isPlatformBrowser(this.platformId)) {
      savedLang = localStorage.getItem('lang') as Language;
    }

    const initialLang = (savedLang && ['en', 'fr'].includes(savedLang)) ? savedLang : 'en';
    this.setLanguage(initialLang);
  }

  setLanguage(lang: Language) {
    this.translateService.use(lang).subscribe(() => {
      this.currentLang.set(lang);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('lang', lang);
      }
    });
  }

  toggleLanguage() {
    const newLang = this.currentLang() === 'en' ? 'fr' : 'en';
    this.setLanguage(newLang);
  }

  translate(key: string): string {
    return this.translateService.instant(key);
  }
}
