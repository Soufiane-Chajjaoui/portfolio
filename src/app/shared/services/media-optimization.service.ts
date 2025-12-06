import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaOptimizationService {
  private observer: IntersectionObserver;

  constructor() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadVideo(entry.target as HTMLVideoElement);
              this.observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '100px' }
      );
    }
  }

  observeVideo(video: HTMLVideoElement) {
    if (this.observer) {
      this.observer.observe(video);
    } else {
      this.loadVideo(video);
    }
  }

  private loadVideo(video: HTMLVideoElement) {
    video.src = video.dataset['src'] || '';
    video.load();
  }

  unobserve(video: HTMLVideoElement) {
    if (this.observer) {
      this.observer.unobserve(video);
    }
  }

  generateImageSrcSet(basePath: string, widths: number[] = [480, 768, 1024, 1440, 1920]): string {
    return widths
      .map(width => `${this.getOptimizedImagePath(basePath, width)} ${width}w`)
      .join(', ');
  }

  private getOptimizedImagePath(basePath: string, width: number): string {
    const ext = basePath.split('.').pop();
    const name = basePath.substring(0, basePath.lastIndexOf('.'));
    return `${name}-${width}w.${ext}`;
  }

  getWebpFallback(basePath: string): { webp: string; fallback: string } {
    const ext = basePath.split('.').pop();
    const name = basePath.substring(0, basePath.lastIndexOf('.'));
    return {
      webp: `${name}.webp`,
      fallback: basePath
    };
  }

  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.onload = () => resolve();
      link.onerror = () => reject();
      document.head.appendChild(link);
    });
  }

  prefetchResource(href: string, as: 'image' | 'script' | 'style' = 'image'): void {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    }
  }
}
