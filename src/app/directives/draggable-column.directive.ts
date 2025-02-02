import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggableColumn]'
})
export class DraggableColumnDirective {

  private startX = 0;
  private startWidth = 0;
  private column: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.column = this.el.nativeElement; // Target the column header
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    event.preventDefault(); // Prevent text selection or other default behavior
    this.startX = event.pageX;
    this.startWidth = this.column.offsetWidth; // Get the initial width of the column

    // Listen for mousemove and mouseup events on the document
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private onMouseMove = (event: MouseEvent): void => {
    const newWidth = this.startWidth + (event.pageX - this.startX); // Calculate new width
    this.renderer.setStyle(this.column, 'width', `${newWidth}px`); // Apply the new width to the column
  };

  private onMouseUp = (): void => {
    // Remove event listeners when mouseup occurs
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
}
