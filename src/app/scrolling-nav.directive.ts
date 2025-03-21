import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollingNav]'
})
export class ScrollingNavDirective {
  private isScrolled = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.isScrolled = window.scrollY > 100; 
    this.updateNavStyles();
  }

  private updateNavStyles() {
    if (this.isScrolled) {
      this.renderer.addClass(this.el.nativeElement, 'solidNav');
      this.renderer.removeClass(this.el.nativeElement, 'transparentNav');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'transparentNav');
      this.renderer.removeClass(this.el.nativeElement, 'solidNav');
    }
  }
}
