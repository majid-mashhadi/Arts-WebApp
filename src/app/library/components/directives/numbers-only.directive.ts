import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[NumberOnly]',
})
export class NumberOnly {
  // private readonly regexStr = '^[0-9]*$';
  private readonly regEx = new RegExp('^[0-9]*$');

  constructor(private el: ElementRef) {}

  @Input() NumberOnly: boolean = true;
  @Input() maxlength: number = 5;

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    let e = <KeyboardEvent>event;
    if (this.NumberOnly) {
      if (
        [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        ['ArrowRight', 'ArrowLeft'].indexOf(e.key) != -1
      ) {
        // let it happen, don't do anything
        return;
      }
      if (!this.isValid(event.key)) {
        e.preventDefault();
      }
    }
  }

  @HostListener('paste', ['$event']) onPaste(e: any) {
    let pastedText = e.clipboardData.getData('text/plain');
    if (pastedText) {
      if (!this.isValid(pastedText)) {
        event?.preventDefault();
      }
    }
  }

  private isValid(elegible: string): boolean {
    const current: string = this.el.nativeElement.value || '';
    const next: string = current.concat(elegible);
    return this.regEx.test(elegible) && !this.isOverSize(next);
  }

  private isOverSize(str: string): boolean {
    if (this.maxlength && str) {
      return str.length > this.maxlength;
    }
    return false;
  }
}
