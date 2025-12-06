import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { PlatformLocation } from '@angular/common';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient, private platformLocation: PlatformLocation) { }
  getTranslation(lang: string): Observable<any> {
    const baseHref = this.platformLocation.getBaseHrefFromDOM();
    return this.http.get(`${baseHref}assets/i18n/${lang}.json`);
  }
}

export function HttpLoaderFactory(http: HttpClient, platformLocation: PlatformLocation) {
  return new CustomTranslateLoader(http, platformLocation);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient, PlatformLocation]
        }
      })
    )
  ]
};
