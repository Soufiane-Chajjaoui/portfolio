import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImageOptimization]',
  standalone: true
})
export class ImageOptimizationDirective implements OnInit {
  @Input() appImageOptimization: string;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit() {
    const img = this.el.nativeElement;

    img.loading = 'lazy';
    img.decoding = 'async';

    if (!img.sizes) {
      img.sizes = '(max-width: 768px) 100vw, 50vw';
    }

    if (this.appImageOptimization && !img.srcset) {
      const baseSrc = this.appImageOptimization;
      img.srcset = this.generateSrcSet(baseSrc);
    }

    this.addErrorHandling(img);
  }

  private generateSrcSet(baseSrc: string): string {
    const sizes = [480, 768, 1024, 1440, 1920];
    return sizes
      .map(size => `${this.getImageUrl(baseSrc, size)} ${size}w`)
      .join(', ');
  }

  private getImageUrl(baseSrc: string, width: number): string {
    const ext = baseSrc.split('.').pop();
    const name = baseSrc.substring(0, baseSrc.lastIndexOf('.'));
    return `${name}-${width}w.${ext}`;
  }

  private addErrorHandling(img: HTMLImageElement) {
    img.addEventListener('error', () => {
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3C/svg%3E';
      img.alt = 'Image failed to load';
    });
  }
}
