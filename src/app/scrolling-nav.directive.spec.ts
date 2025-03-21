import { ScrollingNavDirective } from './scrolling-nav.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('ScrollingNavDirective', () => {
  let mockElementRef: ElementRef;
  let mockRenderer2: Renderer2;

  beforeEach(() => {
   
    mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    mockRenderer2 = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass']);
  });

  it('should create an instance', () => {
    const directive = new ScrollingNavDirective(mockElementRef, mockRenderer2);
    expect(directive).toBeTruthy();
  });
});
