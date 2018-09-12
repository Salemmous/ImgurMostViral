import { SanitizerPipe } from './sanitizer.pipe';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { TestBed, inject } from '@angular/core/testing';

describe('SanitizerPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule
      ]
    });
  });

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SanitizerPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));
});
