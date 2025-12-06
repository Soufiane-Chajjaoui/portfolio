# Guide de Migration I18n (ngx-translate)

Ce document détaille les étapes réalisées pour migrer le système d'internationalisation personnalisé vers la librairie standard `@ngx-translate/core`.

## 1. Installation des Dépendances

Nous avons installé la librairie principale :
```bash
npm install @ngx-translate/core
```
*Note : Nous n'utilisons pas `@ngx-translate/http-loader` à cause de problèmes de compatibilité avec le système de build (ESM/CommonJS), nous avons donc créé un chargeur personnalisé.*

## 2. Configuration (`app.config.ts`)

Nous avons configuré le `TranslateModule` dans le fichier de configuration de l'application.

### Chargeur Personnalisé (CustomTranslateLoader)
Pour charger les fichiers JSON depuis `/assets/i18n/`, nous avons implémenté une classe simple :

```typescript
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}
```

### Injection des Providers
Dans `appConfig`, nous utilisons `importProvidersFrom` pour initialiser le module :

```typescript
importProvidersFrom(
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })
)
```

## 3. Refactoring du Service (`i18n.service.ts`)

L'ancien `I18nService` a été conservé mais refactorisé pour agir comme une **façade** (adaptateur) vers `TranslateService`. Cela permet de ne pas casser le code existant dans les composants.

- **Avant** : Le service chargeait manuellement les fichiers JSON via `HttpClient`.
- **Après** : Le service délègue tout à `TranslateService`.

```typescript
// Exemple de délégation
setLanguage(lang: Language) {
  this.translateService.use(lang).subscribe(() => {
    this.currentLang.set(lang);
    // ... persistance locale
  });
}

translate(key: string): string {
  return this.translateService.instant(key);
}
```

## 4. Utilisation

### Dans les Templates (via Pipe)
Le `TranslatePipe` existant continue de fonctionner car il utilise `I18nService`.
```html
{{ 'HOME.TITLE' | translate }}
```

### Dans le Code (via Service)
Vous pouvez continuer à utiliser `I18nService` comme avant, ou injecter directement `TranslateService` si vous avez besoin de fonctionnalités avancées de la librairie.

```typescript
// Via I18nService (Recommandé pour la consistance actuelle)
this.i18nService.translate('KEY');

// Via TranslateService (Pour fonctionnalités avancées)
this.translateService.stream('KEY').subscribe(...);
```
