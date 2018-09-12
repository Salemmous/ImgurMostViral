import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): any {
    value = value.replace('.gifv', '.jpg');
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
