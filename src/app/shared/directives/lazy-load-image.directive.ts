import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]',
  standalone: true
})
export class LazyLoadImageDirective implements OnInit {
  @Input() appLazyLoad: string;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit() {
    if (!this.appLazyLoad) {
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.loadImage();
            observer.unobserve(this.el.nativeElement);
          }
        },
        { rootMargin: '50px' }
      );
      observer.observe(this.el.nativeElement);
    } else {
      this.loadImage();
    }
  }

  private loadImage() {
    const img = this.el.nativeElement;
    img.src = this.appLazyLoad;
    img.removeAttribute('appLazyLoad');
  }
}
