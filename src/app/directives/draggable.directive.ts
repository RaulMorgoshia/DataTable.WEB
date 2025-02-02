import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  private isDragging = false;
  private offset = { x: 0, y: 0 };

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const header = this.elementRef.nativeElement.querySelector('.modal-header');
    
    // მხოლოდ მაშინ დაიწყოს დრაგი, როცა ჰედერზე ხდება კლიკი
    if (header && header.contains(event.target as Node)) {
      this.isDragging = true;
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      this.offset.x = event.clientX - rect.left;
      this.offset.y = event.clientY - rect.top;

      this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'absolute');
      this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', '1000');
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      const left = `${event.clientX - this.offset.x}px`;
      const top = `${event.clientY - this.offset.y}px`;

      this.renderer.setStyle(this.elementRef.nativeElement, 'left', left);
      this.renderer.setStyle(this.elementRef.nativeElement, 'top', top);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDragging = false;
  }
}
