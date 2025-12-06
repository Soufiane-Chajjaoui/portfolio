# Optimisation pour Vercel - Guide d'Implementation

## Vue d'ensemble

Cette application a été optimisée pour un déploiement haute performance sur Vercel avec les améliorations suivantes :

## 1. Optimisations de Build Angular

### Configuration Production
- **Tree-shaking**: Suppression automatique du code inutilisé
- **Minification**: Minification complète du CSS et JavaScript
- **Hashing de sortie**: Tous les fichiers ont un hash pour le cache-busting
- **No Source Maps**: Source maps désactivées en production pour réduire la taille
- **AOT Compilation**: Compilation ahead-of-time pour des builds plus rapides

### Configuration TypeScript
- Compilation ES2022 pour les navigateurs modernes
- Skip lib check pour des builds plus rapides
- Import helpers activé (tslib) pour réduire la duplication de code

## 2. Lazy Loading et Code Splitting

### Images et Vidéos
- **LazyLoadImageDirective**: Charge les images uniquement quand elles sont visibles
- **ImageOptimizationDirective**: Optimise avec srcset et lazy loading natif
- **MediaOptimizationService**: Gère le lazy loading des vidéos

```typescript
// Utilisation
<img 
  [appLazyLoad]="imageSrc" 
  appImageOptimization
  alt="Description"
>
```

### Code Splitting
- Composants standalone pour réduction de bundle
- Imports à la demande des dépendances

## 3. Compression et Caching

### Compression Gzip/Brotli
- Express.js configuré avec compression niveau 6
- Automatic gzip par Vercel

### Stratégie de Cache
**Assets avec hash (1 an):**
- `*.js` files
- `*.css` files
- Assets statiques

**HTML (cache-control: no-cache):**
- Rechargement à chaque visite pour vérifier les mises à jour
- Validation avec ETags

## 4. Configuration Vercel (vercel.json)

### Routes et Caching
```json
{
  "version": 2,
  "outputDirectory": "dist/portfolio/browser",
  "routes": [
    {
      "src": "^/assets/(.*)",
      "headers": { "Cache-Control": "public, max-age=31536000, immutable" }
    }
  ]
}
```

### Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 5. Performance Monitoring

### Service de Performance
Service `PerformanceService` qui mesure :
- **FCP** (First Contentful Paint)
- **LCP** (Largest Contentful Paint)
- **CLS** (Cumulative Layout Shift)
- **FID** (First Input Delay)
- **TTFB** (Time to First Byte)

```typescript
// Utilisation dans un composant
constructor(private perf: PerformanceService) {
  this.perf.reportMetrics();
}
```

## 6. Optimisations Spécifiques Vercel

### Production Build
```bash
npm run build
```

Le build produit:
- Bundle compressé et optimisé
- Static pre-rendering via SSR
- Assets avec versioning

### Server-Side Rendering (SSR)
- Angular SSR configuré
- Initial page load optimisé
- Meta tags et open graph optimisés

## 7. Déploiement

### Étapes
1. Commit les changements
2. Push vers GitHub
3. Vercel déploie automatiquement depuis `vercel.json`

### Vérification Post-Déploiement
```bash
# Analyser la taille du bundle
npm run analyze

# Test de performance
npm run build && npm run serve:ssr:portfolio
```

## 8. Recommandations Supplémentaires

### Images Optimales
- Utiliser WebP avec fallback
- Images responsive avec srcset
- Dimensions appropriées pour chaque device

### CDN
- Vercel utilise Vercel Edge Network globalement
- Cache automatique des assets

### Monitoring
- Implémenter Web Vitals tracking
- Monitorer avec Vercel Analytics
- Alertes sur dégradation de performance

## 9. Bundle Size Budget

- **Initial**: Max 400kb (warning), 800kb (error)
- **Any Component Style**: Max 2kb (warning), 4kb (error)

## 10. Checklist Avant Production

- [ ] Build sans erreurs: `npm run build`
- [ ] Test SSR: `npm run serve:ssr:portfolio`
- [ ] Analyser bundle: `npm run analyze`
- [ ] Test performance local
- [ ] Vérifier les caches headers
- [ ] Tester en mode hors ligne (PWA)
- [ ] Lighthouse score > 90
