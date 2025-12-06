import { Injectable } from '@angular/core';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private metrics: PerformanceMetrics = {
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.observeWebVitals();
    }
  }

  private observeWebVitals() {
    this.measureFCP();
    this.measureLCP();
    this.measureCLS();
    this.measureFID();
    this.measureTTFB();
  }

  private measureFCP() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime;
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.debug('FCP observation not supported');
      }
    }
  }

  private measureLCP() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          this.metrics.lcp = entries[entries.length - 1].startTime;
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.debug('LCP observation not supported');
      }
    }
  }

  private measureCLS() {
    let clsValue = 0;
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
              this.metrics.cls = clsValue;
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.debug('CLS observation not supported');
      }
    }
  }

  private measureFID() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            this.metrics.fid = (entry as any).processingDuration;
          }
        });
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.debug('FID observation not supported');
      }
    }
  }

  private measureTTFB() {
    if ('PerformanceObserver' in window) {
      try {
        const perfData = performance.getEntriesByType('navigation')[0] as any;
        if (perfData) {
          this.metrics.ttfb = perfData.responseStart;
        }
      } catch (e) {
        console.debug('TTFB measurement not supported');
      }
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  reportMetrics() {
    if (typeof window !== 'undefined' && navigator.sendBeacon) {
      const metrics = this.getMetrics();
      const data = new FormData();
      Object.entries(metrics).forEach(([key, value]) => {
        if (value !== null) {
          data.append(key, value.toString());
        }
      });
      navigator.sendBeacon('/api/metrics', data);
    }
  }
}
