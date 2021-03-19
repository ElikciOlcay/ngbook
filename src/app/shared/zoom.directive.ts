import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[bmZoom]'
})
export class ZoomDirective {

  @HostBinding('class.small') isZoomed: boolean;
  @HostBinding('style.transition') transition: string;
  @HostListener('mouseenter') onMouseEnter(): void {
    this.isZoomed = true;
    this.transition = 'width 0.5s';
  }
  @HostListener('mouseleave') onMouseLeave(): void{
    this.isZoomed = false;
    this.transition = 'width 0.5s';
  }

  constructor() { }

}
